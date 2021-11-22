const express = require('express');
const controller = require('../controllers/user')
const router = express.Router();


router.get('/user', controller.getData)
module.exports = router;    