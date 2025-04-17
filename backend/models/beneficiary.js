'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beneficiary extends Model {
    static associate(models) {}
  }

  Beneficiary.init({
    name: DataTypes.STRING,
    aadhaarNumber: DataTypes.STRING,
    age: DataTypes.INTEGER,
    scheme: DataTypes.STRING,
    status: DataTypes.STRING,
    lastCertification: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Beneficiary',
  });

  return Beneficiary;
};
