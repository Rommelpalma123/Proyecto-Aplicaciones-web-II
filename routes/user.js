const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/user')

const router = express.Router();



router.get('/users', getUsers);
router.post('/user', createUser)
router.get('/user/:id', getUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)
router.put('/user/:id', updateUser)


module.exports = router;    