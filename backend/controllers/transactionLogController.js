const { TransactionLog } = require('../models');

// GET all transaction logs
const getAll = async (req, res) => {
  try {
    const logs = await TransactionLog.findAll({ order: [['timestamp', 'DESC']] });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transaction logs' });
  }
};

// Create a new transaction log (to use in other modules)
const createLog = async ({ aadhaarNumber, name, type, status, performedBy }) => {
  try {
    await TransactionLog.create({
      aadhaarNumber,
      name,
      type,
      status,
      performedBy,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Failed to log transaction:', error);
  }
};

module.exports = {
  getAll,
  createLog,
};
