const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/user')

const router = express.Router();

//Crud los usuarios que tengo 
// Get de los usuarios
router.get('/msg', getmessage);

router.get('/', getUsers);
// Get de un solo usuario con su ID
router.get('/:id', getUser );

// post para guardar usuario
router.post('/', createUser);

// put para actulizar Usuario
router.put('/:id',updateUser );

// Delete para Eliminar usuario
router.delete('/:id', deleteUser)

module.exports = router;