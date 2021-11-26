const model = require('../models/session.model')

const usuario=  ( req, res) =>
{
    model.find({}, (req, docs) => {

        res.send({
            docs
        })
    })
    res.send('esto viene desde la rura user')
}

const insertar = ( req, res) =>{

    const data = req.body
    model.create(data, (err,docs) =>{
        res.send({ data: docs})
    })
}

module.exports = { usuario, insertar };