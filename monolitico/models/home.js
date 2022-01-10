const mongoose = require('mongoose');
const { Schema } = mongoose;
const homeschema = new Schema({
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

module.exports = mongoose.model('homeuser', homeschema);