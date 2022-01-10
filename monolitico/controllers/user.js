const User = require('../models/user');

const getmessage = async ( req, res) =>
{

    res.send("esta ruta es monolitica v1");
}

const getUsers = async ( req, res) =>
{
    const users = await User.find();
    res.json(users);
}

const createUser = async (req, res) => 
{
    const { Nombre, Conversacion } = req.body;
    const user = new User({Nombre, Conversacion});
    await user.save();
    res.json({status: 'User Saved'});
}

const getUser = async (req, res) => 
{
    const user = await User.findById(req.params.id);
    res.json(user);
}

const deleteUser = async (req, res) => 
{
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'user Deleted'});
}

const updateUser = async (req, res) => 
{
    const { Nombre, Conversacion } = req.body;
    const newUser = {Nombre, Conversacion};
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User Updated'});
}
module.exports = { updateUser, getUsers, createUser, getUser, deleteUser, getmessage };