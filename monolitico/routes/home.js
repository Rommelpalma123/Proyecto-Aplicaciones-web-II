const express = require('express');
const route = express.Router()

const { update_user, homeRoutes, add_user } = require('../services/render');
const controller = require('../controllers/home');

route.get('/home', homeRoutes);

route.get('/add-user', add_user)

route.get('/update-user', update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route