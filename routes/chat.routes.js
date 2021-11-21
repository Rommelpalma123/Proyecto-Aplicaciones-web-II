const express = require('express')
const { Router } = require('express');
const { check } = require('express-validator');
const router = express.Router();

router.get('/',  (req, res) =>
{
    res.render("index", {titulo: "hola a todos "})
})

router.get('/hola',  (req, res) =>
{
    res.render("servicios", {sub: "hola a todos "})
})

module.exports = router;