const express = require('express');
const  usuario  = require('../controllers/user')
const router = express.Router();


router.get('/user', usuario.index)
module.exports = router;    