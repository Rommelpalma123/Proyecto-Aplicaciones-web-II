require('dotenv').config();
const Server = require('./models/server');
const routes = require('./routes/chat.routes');
const server = new Server();
server.listen();

/*const express = require('express')
require('dotenv').config();
const {Router} = require('./models/server');
const Server = require('./models/server');
const server = Router();
server.use('/', require('./routes/chat.routes'))

server.use((req, res, next) => {

    res.status(400).render("404", 
    {
        titulo: "404",
        description: "titulo del sitio "
    })
})*/