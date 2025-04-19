'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionLog.init({
    aadhaarNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    performedBy: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TransactionLog',
  });
  return TransactionLog;
};