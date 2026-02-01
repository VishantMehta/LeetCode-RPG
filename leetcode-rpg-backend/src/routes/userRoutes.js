const express = require('express');
const { syncUserProfile } = require('../controllers/userController');

const router = express.Router();

//Route: GET /api/users/sync/:username
router.get('/sync/:username', syncUserProfile);

module.exports = router;    