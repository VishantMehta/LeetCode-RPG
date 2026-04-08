const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Cloud PostgreSQL connection error:', err.stack);
    } else {
        console.log('Cloud Database connected successfully!');
        release();
    }
});

module.exports = { pool };