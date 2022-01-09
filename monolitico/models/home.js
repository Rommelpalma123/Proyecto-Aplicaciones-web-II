const mongoose = require('mongoose');

const homeschema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "nombre es requerido abligatoriamente"]
    },
    email : {
        type: String,
        required: [true, "email es requerido abligatoriamente"],
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('homeuser', homeschema);

module.exports = Userdb;