const express = require('express');
const router = express.Router();
const controller = require('../controllers/deathRecordController');

router.get('/', controller.getAll);
router.get('/:aadhaarNumber', controller.getByAadhaar);
router.post('/', controller.create);

module.exports = router;
