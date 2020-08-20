const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "nodecomplete",
    password: "Faiztech.01"
});

module.exports = pool.promise();