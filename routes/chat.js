const express = require('express');
const chat = require('../controllers/chat')
const router = express.Router();

router.get('/chat', chat.index)

module.exports = router;