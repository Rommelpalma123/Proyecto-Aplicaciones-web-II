const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser, getmessage } = require('../controllers/user')

// CRUD
const router = express.Router();
const Usuario= require('../models/user')

//Crud los usuarios que tengo 
// Get de los usuarios
router.get('/', getmessage);

router.get('/', getUsers);
// Get de un solo usuario con su ID
router.get('/:id', getUser );

// post para guardar usuario
router.post('/', createUser);

// put para actulizar Usuario
router.put('/:id',updateUser );

// Delete para Eliminar usuario
router.delete('/:id', deleteUser)

/* GET all Tasks
router.get('/users', getUsers);

router.get('/messageuser', getmessage);

// GET all Tasks
router.get('/user/:id', getUser);

// ADD a new task
router.post('/user', createUser);

// UPDATE a new task
router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser); */

module.exports = router;