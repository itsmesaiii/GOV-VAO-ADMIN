const { Beneficiary } = require('../models');

const getAll = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.findAll();
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

module.exports = {
  getAll,
  getByAadhaar,
  create,
};
