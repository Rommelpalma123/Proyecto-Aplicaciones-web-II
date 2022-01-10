const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    Nombre: { type: String},
    Conversacion: { type: String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);