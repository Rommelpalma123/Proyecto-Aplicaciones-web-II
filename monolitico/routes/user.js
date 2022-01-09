const express = require('express');
const { getUsers, createUser, getUser, deleteUser, updateUser, getmessage } = require('../controllers/user')

// CRUD
const router = express.Router();
const Usuario= require('../models/user')

//Crud los usuarios que tengo 
// Get de los usuarios
router.get('/', async (req, res) => {
    const users = await Usuario.find();
    res.json(users);
});
// Get de un solo usuario con su ID
router.get('/:id', async (req, res) =>{
    const user = await Usuario.findById(req.params.id);
    res.json(user);
});

// post para guardar usuario
router.post('/', async (req, res) => {
    const {nombre, description } = req.body;
    const user = new Usuario ({nombre, description});
    await user.save();
    res.json({status:'Task Saved'});
});

// put para actulizar Usuario
router.put('/:id', async (req, res) =>{
    const {nombre, description} = req.body;
    const newUsuario = {nombre, description};
    await Usuario.findByIdAndUpdate(req.params.id, newUsuario);
    res.json({status:'Task Updated'});
});

// Delete para Eliminar usuario
router.delete('/:id', async (req, res) =>{
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({status:'Task Delete'})
})

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