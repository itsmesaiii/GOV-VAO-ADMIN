'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const schemes = ['IGNOAPS', 'IGNDPS', 'IGNWPS', 'DAPS'];
    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push({
        name: faker.person.fullName(),
        aadhaarNumber: faker.string.numeric(12),
        age: faker.number.int({ min: 60, max: 90 }),
        scheme: faker.helpers.arrayElement(schemes),
        status: 'Active',
        lastCertification: faker.date.past({ years: 1 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Beneficiaries', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Beneficiaries', null, {});
  }
};
