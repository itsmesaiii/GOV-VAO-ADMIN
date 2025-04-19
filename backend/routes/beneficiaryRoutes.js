const express = require('express');
const router = express.Router();
const controller = require('../controllers/beneficiaryController');

router.get('/', controller.getAll);
router.get('/:aadhaarNumber', controller.getByAadhaar);
router.post('/', controller.create);

router.put('/:aadhaarNumber/mark-deceased', controller.markAsDeceased);

module.exports = router;
