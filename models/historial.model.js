const { Schema } = require('mongoose');
const mongoose = require('mongoose');
// creamos arreglos
const Historial = new Schema(

    {
        number:  {type: String},
        message: {type: String},
        today:   {type: String},

    },

    { timestamp: { createdAt: true, updatedAt: true} }
)

module.exports = mongoose.model("historia", Historial)

