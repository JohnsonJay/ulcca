const express = require('express');

const compatibilityController = require('../controllers/compatibility');
const router = express.Router();

// POST /compatibility
router.post('/', compatibilityController.checkCompatibility);

module.exports = router;
