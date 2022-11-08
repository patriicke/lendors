"use strict";
const DataTypes = require("sequelize/lib/data-types");
const { registerSchema } = require("swaggiffy");
const { sequelize } = require("../utils/database");

const Request = sequelize.define(
  "Request",
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    carId: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.STRING, allowNull: false },
    endDate: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    }
  },
  {}
);

//registerSchema('Request', sequelize.createSchema('Request'), { orm: "sequelize" });

module.exports = () => {
  return Request;
};
