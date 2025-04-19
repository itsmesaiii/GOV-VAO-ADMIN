// backend/routes/deathRecordRoutes.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const controller = require('../controllers/deathRecordController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // make sure this folder exists: backend/uploads
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // keep the original extension (.pdf)
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);       // ".pdf"
    const base = path.basename(file.originalname, ext);
    cb(null, `${timestamp}-${base}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', controller.getAll);
router.get('/matches', controller.getMatchedRecords);
router.get('/:aadhaarNumber', controller.getByAadhaar);

// now this route will save as "<timestamp>-originalname.pdf"
router.post('/', upload.single('proofFile'), controller.create);

module.exports = router;
