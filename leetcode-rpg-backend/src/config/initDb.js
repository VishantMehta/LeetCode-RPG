const { pool } = require('./db');

const createTables = async () => {
    const queryText = `
        -- UUID generate karne ke liye extension enable karna
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        -- 1. Users Table
        CREATE TABLE IF NOT EXISTS Users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            leetcode_username VARCHAR(255) UNIQUE NOT NULL,
            total_xp INTEGER DEFAULT 0,
            current_level INTEGER DEFAULT 1,
            coins_earned INTEGER DEFAULT 0,
            last_synced_at TIMESTAMP
        );

        -- 2. Questions Table
        CREATE TABLE IF NOT EXISTS Questions (
            id INTEGER PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            difficulty VARCHAR(50) CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
            topic_tags TEXT[],
            xp_reward INTEGER
        );

        -- 3. User_Submissions Table
        CREATE TABLE IF NOT EXISTS User_Submissions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
            question_id INTEGER REFERENCES Questions(id) ON DELETE CASCADE,
            solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, question_id) -- Idempotency: No duplicate submissions
        );

        -- Performance Index
        CREATE INDEX IF NOT EXISTS idx_user_submissions ON User_Submissions(user_id, solved_at DESC);

        -- 4. User_Skills Table (Skill Tree)
        CREATE TABLE IF NOT EXISTS User_Skills (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
            skill_name VARCHAR(100),
            xp INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            UNIQUE(user_id, skill_name)
        );

        -- 5. Badges Table
        CREATE TABLE IF NOT EXISTS Badges (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT,
            image_url VARCHAR(255),
            condition_type VARCHAR(100),
            condition_value INTEGER
        );

        -- 6. User_Badges Table (Inventory)
        CREATE TABLE IF NOT EXISTS User_Badges (
            user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
            badge_id UUID REFERENCES Badges(id) ON DELETE CASCADE,
            unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, badge_id)
        );
    `;

    try {
        console.log('⏳ Creating database tables...');
        await pool.query(queryText);
        console.log('All 6 tables created successfully! Database is ready.');
    } catch (err) {
        console.error('Error creating tables:', err.stack);
    } finally {
        pool.end(); 
    }
};

createTables();