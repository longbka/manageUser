// get the client
const mysql = require("mysql2/promise");
// get the promise implementation, we will use bluebird
const bluebird = require("bluebird");
// create the connection, specify bluebird as Promise
const getConnectionDb = async () => {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  return connection;
};
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('jwt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
const connection = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connection()
module.exports = {getConnectionDb,connection}