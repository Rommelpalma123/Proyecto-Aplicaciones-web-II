const { Schema } = require('mongoose');
const mongoose = require('mongoose');
// creamos arreglos
const Session = new Schema(

    {
        number:  {type: String}

    },

    { timestamp: { createdAt: true, updatedAt: true} }
)

module.exports = mongoose.model("Sesion", Session)

