"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        names: "Patrick NDAYAMBAJE",
        email: "patrickndayambaje@gmail.com",
        role: "admin",
        address: "Kigali, Rwanda",
        telephone: "+250790603658",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
