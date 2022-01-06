const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String},
    description: { type: String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);