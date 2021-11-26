const express = require('express');
const chat = require('../controllers/chat')
const router = express.Router();

router.get('/chat', chat)
//router.post('/send',sendWithApi);


module.exports = router;