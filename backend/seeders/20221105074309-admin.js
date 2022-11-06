"use strict";
require("dotenv").config();
const bcryptjs = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        id: v4(),
        names: "Patrick NDAYAMBAJE",
        email: "patrickndayambaje4@gmail.com",
        role: "admin",
        address: "Kigali, Rwanda",
        telephone: "+250790603658",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: await bcryptjs.hash(process.env.MY_PASSWORD, 8)
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
