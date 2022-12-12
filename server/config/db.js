const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "pass",
database:"emails_db",
connectionLimit: 10 
})

module.exports = db;