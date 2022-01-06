const express = require('express');
const { message, messagenew, messeagesync } = require('../controllers/chat')
const router = express.Router();

router.get('/', message )
router.get('/messages/sync', messeagesync)
router.post('/messages/new', messagenew)

module.exports = router;