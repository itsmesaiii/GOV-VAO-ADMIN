const { Beneficiary } = require('../models');
const { createLog } = require('./transactionLogController'); // ✅ import logger

const getAll = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll({
      order: [['id', 'ASC']], // ✅ ensures consistent order
    });
    res.json(beneficiaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch beneficiaries' });
  }
};

const getByAadhaar = async (req, res) => {
  const { aadhaarNumber } = req.params;
  try {
    const beneficiary = await Beneficiary.findOne({ where: { aadhaarNumber } });
    if (beneficiary) {
      res.json(beneficiary);
    } else {
      res.status(404).json({ message: 'Beneficiary not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching beneficiary' });
  }
};

const create = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.create(req.body);
    res.status(201).json(beneficiary);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating beneficiary' });
  }
};

// ✅ New: Mark as Deceased and log the action
const markAsDeceased = async (req, res) => {
  const { aadhaarNumber } = req.params;
  console.log('🔥 markAsDeceased triggered for Aadhaar:', aadhaarNumber);

  try {
    const beneficiary = await Beneficiary.findOne({ where: { aadhaarNumber } });

    if (!beneficiary) {
      console.log('❌ Beneficiary not found for:', aadhaarNumber);
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    // Update status
    beneficiary.status = 'Deceased';
    await beneficiary.save();

    // Log transaction
    await createLog({
      aadhaarNumber,
      name: beneficiary.name,
      type: 'Status Update',
      status: 'Success',
      performedBy: 'Admin',
    });

    res.json({ message: 'Beneficiary marked as deceased', beneficiary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error marking as deceased' });
  }
};

module.exports = {
  getAll,
  getByAadhaar,
  create,
  markAsDeceased, // ✅ export the new function
};
