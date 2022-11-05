const { Sequelize } = require("sequelize");
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const databaseUsername = process.env.DATABASE_USERNAME;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseName = process.env.DATABASE_NAME;
const databaseHost = process.env.DATABASE_HOST;

const client = new Client({
  user: databaseUsername,
  password: databasePassword,
  host: databaseHost,
  database: "postgres"
});
client.connect();

//Check if database exists or not

client.query(`CREATE DATABASE "${databaseName}"`, (err, res) => {
  client.end();
});

// const sequelize = new Sequelize('', {}) Sequelize instance

const sequelize = new Sequelize(
  databaseName,
  databaseUsername,
  databasePassword,
  {
    host: databaseHost,
    dialect: "postgres"
  }
);

exports.sequelize = sequelize;

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error({
      message: "Unable to connect to the database:",
      error: error
    });
  }
};
