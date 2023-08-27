require("dotenv").config({ path: __dirname + "/./../../.env" });
const mysql = require("mysql2/promise");

exports.dbQuery = async function dbQuery(query, values) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  // query database
  const [rows] = await connection.execute(query, values);
  return rows;
};
// const [rows, fields] = await connection.execute(
//   "SELECT * FROM `tbTeste` WHERE `nome` = ?",
//   ["Adriel"]
// );

// this.dbQuery("INSERT INTO tbTeste VALUES (?, ?)", [1, 'Felipe'])
// this.dbQuery("SELECT * FROM tbTeste WHERE id = ?", [1])
