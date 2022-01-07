const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser, getmessage } = require('../controllers/user')

const router = express.Router();

// GET all Tasks
router.get('/users', getUsers);

router.get('/messageuser', getmessage);

// GET all Tasks
router.get('/user/:id', getUser);

// ADD a new task
router.post('/user', createUser);

// UPDATE a new task
router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);

module.exports = router;