
const Messages = require('../models/chat')

const message = (req, res) =>
{
    res.send("microservicios de chat v1") 
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
    const { message, name, timestamp, received } = req.body;
    const user = new Messages({message, name, timestamp, received});
    user.save();
    res.json({status: 'chat enviado '});
}

module.exports = { message, messagenew, messeagesync };

