const express = require('express');
const route = express.Router()

const { update_user, homeRoutes, add_user } = require('../services/render');
const { deleteuser, update, create, find } = require('../controllers/home');

route.get('/home', homeRoutes);

route.get('/add-user', add_user)

route.get('/update-user', update_user)


// API
route.post('/api/user', create);
route.get('/api/user', find);
route.put('/api/user/:id', update);
route.delete('/api/user/:id', deleteuser);


module.exports = route