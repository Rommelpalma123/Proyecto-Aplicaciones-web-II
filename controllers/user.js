const User = require('../models/user');


const getUsers = ( req, res) =>
{
    const users = User.find();
    res.json(users);
}

const createUser = (req, res) => 
{
    const { nombre, description } = req.body;
    const user = new User({nombre, description});
    user.save();
    res.json({status: 'User Saved'});
}

const getUser = (req, res) => 
{
    const user =  User.findById(req.params.id);
    res.json(user);
}

const deleteUser = (req, res) => 
{
    User.findByIdAndRemove(req.params.id);
    res.json({status: 'user Deleted'});
}

const updateUser = (req, res) => 
{
    const { name, description } = req.body;
    const newUser = {name, description};
    User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User Updated'});
}
module.exports = { updateUser, getUsers, createUser, getUser, deleteUser };