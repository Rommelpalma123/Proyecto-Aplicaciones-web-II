const User = require('../models/user');


const getUsers = async ( req, res) =>
{
    const users = await User.find();
    res.json(users);
}

const createUser = async (req, res) => 
{
    const { nombre, description } = req.body;
    const user = new User({nombre, description});
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
    const { name, description } = req.body;
    const newUser = {name, description};
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User Updated'});
}
module.exports = { updateUser, getUsers, createUser, getUser, deleteUser };