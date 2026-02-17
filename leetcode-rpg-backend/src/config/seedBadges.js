const { pool } = require('./db');

const seedBadges = async () => {
    const badges = [
        { name: 'Novice Solver', description: 'Reached Level 5', condition_type: 'LEVEL', condition_value: 5 },
        { name: 'Code Warrior', description: 'Reached Level 10', condition_type: 'LEVEL', condition_value: 10 },
        { name: 'Flame Striker', description: 'Reached Level 15', condition_type: 'LEVEL', condition_value: 15 },
        { name: 'Algorithm Mage', description: 'Reached Level 25', condition_type: 'LEVEL', condition_value: 25 },
        { name: 'Crown of Logic', description: 'Reached Level 50', condition_type: 'LEVEL', condition_value: 50 }
    ];

    try {
        console.log('⏳ Seeding Badges into the database...');
        
        for (const badge of badges) {
            await pool.query(`
                INSERT INTO Badges (name, description, condition_type, condition_value)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (name) DO NOTHING;
            `, [badge.name, badge.description, badge.condition_type, badge.condition_value]);
        }
        
        console.log('Badges seeded successfully!');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        pool.end();
    }
};

seedBadges();