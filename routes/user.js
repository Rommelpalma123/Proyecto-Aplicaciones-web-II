const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/user')

const router = express.Router();

// GET all Tasks
router.get('/', getUsers);

// GET all Tasks
router.get('/:id', getUser);

// ADD a new task
router.post('/', createUser);

// UPDATE a new task
router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;