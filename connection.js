import mysql from 'mysql'

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lucas123",
  database: "commerce",
});

export default connection;