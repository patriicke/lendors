// const { Sequelize } = require("sequelize");
// require("dotenv").config();
// const { Client } = require("pg");

// const client = new Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.DB_HOST,
//   database: "postgres"
// });
// client.connect();

// //Check if database exists or not
// client.query(`CREATE DATABASE "${process.env.DB_NAME}"`, (err, res) => {
//   console.log(err, res);
//   client.end();
// });

// //Create new sequelize instance of database
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres"
//   }
// );
// //Connect to database
// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connected to the Database");
//   } catch (error) {
//     console.log("Failed to connect:", error.message);
//   }
// };

// module.exports = { sequelize, connect };
