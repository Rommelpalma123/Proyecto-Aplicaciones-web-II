const express = require('express');
const controller = require('../controllers/chat')
const router = express.Router();

router.get('/chat', controller.getData)

module.exports = router;