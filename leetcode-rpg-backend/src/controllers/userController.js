const { pool } = require('../config/db');
const { fetchUserStats } = require('../utils/leetcode');
const { calculateTotalXP, calculateLevel } = require('../utils/gamification');

const syncUserProfile = async (req, res) => {
    const { username } = req.params;

    const client = await pool.connect();

    try {
        console.log(`Starting sync for user: ${username}`);

        const stats = await fetchUserStats(username);

        const totalXp = calculateTotalXP(stats.easySolved, stats.mediumSolved, stats.hardSolved);
        const currentLevel = calculateLevel(totalXp);

        await client.query('BEGIN');

        const upsertUserQuery = `
            INSERT INTO Users (leetcode_username, total_xp, current_level, last_synced_at)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (leetcode_username) 
            DO UPDATE SET 
                total_xp = EXCLUDED.total_xp,
                current_level = EXCLUDED.current_level,
                last_synced_at = NOW()
            RETURNING *;
        `;
        
        const result = await client.query(upsertUserQuery, [username, totalXp, currentLevel]);
        const savedUser = result.rows[0];

        await client.query('COMMIT');

        res.status(200).json({
            status: 'success',
            message: 'Profile synced successfully!',
            data: {
                user: savedUser,
                leetcode_stats: stats
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction Rolled Back due to error:', error);
        
        res.status(500).json({
            status: 'error',
            message: 'Failed to sync profile',
            error: error.message
        });
    } finally {
        client.release();
    }
};

module.exports = {
    syncUserProfile
};