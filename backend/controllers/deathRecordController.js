const { DeathRecord } = require('../models');

const getAll = async (req, res) => {
  try {
    const records = await DeathRecord.findAll();
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch death records' });
  }
};

const getByAadhaar = async (req, res) => {
  const { aadhaarNumber } = req.params;
  try {
    const record = await DeathRecord.findOne({ where: { aadhaarNumber } });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Death record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching death record' });
  }
};

const create = async (req, res) => {
  try {
    const newRecord = await DeathRecord.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating death record' });
  }
};

module.exports = {
  getAll,
  getByAadhaar,
  create,
};
