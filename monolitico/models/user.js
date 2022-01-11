const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    Nombre: { type: String},
    Descripcion: { type: String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);