require("dotenv").config({ path: __dirname + "/./../../.env" });
const mysql = require("mysql2/promise");

try {
  exports.dbQuery = async function dbQuery(query, values) {
    const connection = await mysql.createConnection({
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      dateStrings: "date",
    });

    const [rows] = await connection.execute(query, values);
    return rows;
  };
} catch (err) {
  console.log(err);
}
