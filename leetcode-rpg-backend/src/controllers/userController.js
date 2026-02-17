const { pool } = require('../config/db');
const { fetchUserStats } = require('../utils/leetcode');
const { calculateTotalXP, calculateLevel, mapTagsToSkills } = require('../utils/gamification');

const syncUserProfile = async (req, res) => {
    const { username } = req.params;
    const client = await pool.connect();

    try {
        console.log(`🗡️ Starting Advanced Sync for warrior: ${username}`);

        const stats = await fetchUserStats(username);
        const totalXp = calculateTotalXP(stats.easySolved, stats.mediumSolved, stats.hardSolved);
        const currentLevel = calculateLevel(totalXp);
        const skills = mapTagsToSkills(stats.topicStats);

        await client.query('BEGIN'); 

        const userResult = await client.query(`
            INSERT INTO Users (leetcode_username, total_xp, current_level, last_synced_at)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (leetcode_username) DO UPDATE SET 
                total_xp = EXCLUDED.total_xp, current_level = EXCLUDED.current_level, last_synced_at = NOW()
            RETURNING id, leetcode_username, total_xp, current_level;
        `, [username, totalXp, currentLevel]);
        
        const userId = userResult.rows[0].id;
        for (const [skillName, skillXp] of Object.entries(skills)) {
            const skillLevel = Math.floor(skillXp / 20) + 1; 
            await client.query(`
                INSERT INTO User_Skills (user_id, skill_name, xp, level)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (user_id, skill_name) DO UPDATE SET xp = EXCLUDED.xp, level = EXCLUDED.level;
            `, [userId, skillName, skillXp, skillLevel]);
        }


        const badgesResult = await client.query("SELECT * FROM Badges WHERE condition_type = 'LEVEL'");
        const allBadges = badgesResult.rows;

        for (const badge of allBadges) {
            if (currentLevel >= badge.condition_value) {
                await client.query(`
                    INSERT INTO User_Badges (user_id, badge_id)
                    VALUES ($1, $2)
                    ON CONFLICT DO NOTHING;
                `, [userId, badge.id]);
            }
        }

        const unlockedBadgesResult = await client.query(`
            SELECT b.name FROM User_Badges ub
            JOIN Badges b ON ub.badge_id = b.id
            WHERE ub.user_id = $1;
        `, [userId]);
        
        const unlockedBadgeNames = unlockedBadgesResult.rows.map(row => row.name);

        await client.query('COMMIT'); 

        res.status(200).json({
            status: 'success',
            data: {
                user: userResult.rows[0],
                leetcode_stats: { easySolved: stats.easySolved, mediumSolved: stats.mediumSolved, hardSolved: stats.hardSolved },
                rpg_skills: skills,
                unlocked_badges: unlockedBadgeNames 
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction Rolled Back:', error.message);
        res.status(500).json({ status: 'error', message: 'Failed to sync' });
    } finally {
        client.release();
    }
};

module.exports = { syncUserProfile };