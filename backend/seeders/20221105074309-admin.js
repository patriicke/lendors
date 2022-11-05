'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      names: "Ndayambaje Patrick",
      email: 'patrickndayambaje@gmail.com',
      role: 'admin',
      address: "Kigali, Rwanda",
      telephone: "+250782307144",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};