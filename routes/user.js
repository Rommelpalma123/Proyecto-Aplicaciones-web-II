const express = require('express');
const {insertar, usuario} = require('../controllers/user')

const router = express.Router();


router.get('/user', usuario);
router.post('/user', insertar)

module.exports = router;    