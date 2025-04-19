'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeathRecord extends Model {
    static associate(models) {}
  }

  DeathRecord.init({
    name: DataTypes.STRING,
    aadhaarNumber: DataTypes.STRING,
    dateOfDeath: DataTypes.DATE,
    proofFilePath: DataTypes.STRING,
    source: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DeathRecord',
    tableName: 'DeathRecords',
  });

  return DeathRecord;
};