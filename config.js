const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
} else {
    pool = new Pool({
        connectionString: 'postgresql://postgres:123456@localhost:5432/siphon',
        ssl: false
    })
}

module.exports = { pool };