"use strict";
const { v4 } = require("uuid");
const DataTypes = require("sequelize/lib/data-types");
const { sequelize } = require("../utils/database");
const { registerSchema } = require("swaggiffy");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: v4(),
      primaryKey: true
    },
    names: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defautValue: "user", allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  {}
);

//registerSchema('User', sequelize.createSchema('User'), { orm: 'sequelize' });

module.exports = () => {
  return User;
};
