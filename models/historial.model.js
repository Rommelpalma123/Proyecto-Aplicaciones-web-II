const { Schema } = require('mongoose'); // requeriendo la libreria schema  para crear objetos  
const mongoose = require('mongoose');  //  requerir una libreria de  mongosse para conecctarse ala base de dato 
// creamos arreglos

const Historial = new Schema(

    {
        number:  {type: String},  //Craando objetos  historial 
        message: {type: String},  
        today:   {type: String},

    },

    { timestamp: { createdAt: true, updatedAt: true} }
)

module.exports = mongoose.model("historia", Historial) //requeriendo el objeto historial en la base de dato 

