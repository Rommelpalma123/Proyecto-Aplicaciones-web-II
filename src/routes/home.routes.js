const express = require('express');
const server = express();
// const router = Router();

server.get('/home',  (req, res) =>
{
    res.send("hola")  
})