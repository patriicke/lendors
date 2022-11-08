const { Sequelize } = require("sequelize");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
let DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT = 5432;
if (
  process.env.NODE_ENV == "development" ||
  process.env.NODE_ENV == "testing"
) {
  DATABASE_USERNAME = process.env.DATABASE_USERNAME;
  DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  DATABASE_NAME = process.env.DATABASE_NAME;
  DATABASE_HOST = process.env.DATABASE_HOST;
} else {
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  DATABASE_USERNAME = dbUrl.auth.substr(0, dbUrl.auth.indexOf(":"));
  DATABASE_PASSWORD = dbUrl.auth.substr(
    dbUrl.auth.indexOf(":") + 1,
    dbUrl.auth.length
  );
  DATABASE_NAME = dbUrl.path.slice(1);
  DATABASE_HOST = dbUrl.hostname;
  DATABASE_PORT = dbUrl.port;
}
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,

  {
    host: DATABASE_HOST,
    dialect: "postgres",
    port: DATABASE_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

exports.sequelize = sequelize;

exports.connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error({
      message: "Unable to connect to the database:",
      error: error.message
    });
  }
};
