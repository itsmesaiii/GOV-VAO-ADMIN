'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sources = ['VAO', 'Hospital', 'Manual'];
    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push({
        name: faker.person.fullName(),
        aadhaarNumber: faker.string.numeric(12),
        dateOfDeath: faker.date.past({ years: 1 }),
        proofFilePath: `/uploads/proof_${i}.pdf`,
        source: faker.helpers.arrayElement(sources),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('DeathRecords', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DeathRecords', null, {});
  }
};
