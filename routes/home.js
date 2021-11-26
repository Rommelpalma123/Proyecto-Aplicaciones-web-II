const express = require('express');
const home = require('../controllers/home')
const router = express.Router();

router.get('/home', home.index)

module.exports = router;

