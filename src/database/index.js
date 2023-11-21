require("dotenv").config({ path: __dirname + "/./../../.env" });
const mysql = require("mysql2/promise");

exports.dbQuery = async function dbQuery(query, values) {
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    dateStrings: "date",
  });
  // query database
  const [rows] = await connection.execute(query, values);
  return rows;
};
// const [rows, fields] = await connection.execute(
//   "SELECT * FROM `tbTeste` WHERE `nome` = ?",
//   ["Adriel"]
// );

// this.dbQuery("SELECT * FROM tbTeste WHERE id = ?", [1])
