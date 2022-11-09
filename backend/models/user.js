"use strict";
const { v4 } = require("uuid");
const DataTypes = require("sequelize/lib/data-types");
const { sequelize } = require("../utils/database");
const { registerSchema } = require("swaggiffy");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    names: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING, defautValue: "user", allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    requests: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] }
  },
  {}
);

// registerSchema('User', sequelize.createSchema('User'), { orm: 'sequelize' });

module.exports = () => {
  return User;
};
