// backend/controllers/deathRecordController.js

const { DeathRecord, Beneficiary } = require('../models');

const getAll = async (req, res) => {
  try {
    const records = await DeathRecord.findAll({
      order: [['dateOfDeath', 'ASC'], ['id', 'ASC']],
    });
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
    const { name, aadhaarNumber, dateOfDeath, source } = req.body;

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: 'Proof PDF is required' });
    }

    const proofFilePath = req.file.filename;

    const newRecord = await DeathRecord.create({
      name,
      aadhaarNumber,
      dateOfDeath,
      proofFilePath,
      source,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating death record' });
  }
};

const getMatchedRecords = async (req, res) => {
  try {
    const deathRecords = await DeathRecord.findAll();
    const beneficiaries = await Beneficiary.findAll();

    const beneficiaryMap = new Map();
    beneficiaries.forEach(b => {
      if (b.status === 'Active') {
        beneficiaryMap.set(b.aadhaarNumber, b);
      }
    });

    const matched = deathRecords.filter(record =>
      beneficiaryMap.has(record.aadhaarNumber)
    );

    const response = matched.map(record => ({
      id: record.id,
      name: record.name,
      aadhaarNumber: record.aadhaarNumber,
      dateOfDeath: record.dateOfDeath,
      source: record.source,
      proofFilePath: record.proofFilePath,
      matchStatus: 'pending',
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matched death records' });
  }
};

module.exports = {
  getAll,
  getByAadhaar,
  create,
  getMatchedRecords,
};
