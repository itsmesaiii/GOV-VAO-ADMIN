const express = require('express');
const router = express.Router();
const { getVAOUsers, logLogin, getUserLogins } = require('../controllers/userController');

router.get('/vao', getVAOUsers);
router.get('/logins', getUserLogins);
router.post('/logins', logLogin);

module.exports = router;
