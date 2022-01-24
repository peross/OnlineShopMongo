const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'online_shop',
    user: 'root',
    password: 'root',
});

module.exports = pool;