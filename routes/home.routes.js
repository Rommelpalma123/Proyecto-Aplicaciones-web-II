const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const cors = require('cors');
app.use(cors()).use(express.json())
router.get('/home',(req, res) =>
{
    res.send('hola');
})

module.exports = router;