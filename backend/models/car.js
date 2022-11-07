"use strict";
const { v4 } = require("uuid");
const DataTypes = require("sequelize/lib/data-types");
const { sequelize } = require("./../utils/database");
const { registerSchema } = require("swaggiffy");

const Car = sequelize.define(
  "Car",
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    currency: { type: DataTypes.STRING, allowNull: false }
  },
  {}
);

//registerSchema('Car', sequelize.createSchema('Car'), { orm: 'sequelize' });

module.exports = () => {
  return Car;
};
