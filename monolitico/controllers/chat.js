
const Messages = require('../models/chat')

const message = (req, res) =>
{
    res.send(200).send("esta correcto el mensaje") 
}

const messeagesync = (req, res) =>
{
    Messages.find( (err, data) => {

        if (err) {

            res.status(500).send(err);
        }
        else{

            res.status(200).send(data);
        }
    })
}

const messagenew = (req, res) =>
{
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {

        if (err) {

            res.status(500).send(err);
        }
        else{

            res.status(201).send(data);
        }
    })
}

module.exports = { message, messagenew, messeagesync };