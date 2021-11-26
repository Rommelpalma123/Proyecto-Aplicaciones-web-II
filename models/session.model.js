const { Schema } = require('mongoose');
const mongoose = require('mongoose');
// creamos arreglos
const Userschema = new Schema(

    {
        name: {
            
            type : String
        
        },

        avatar: {
            type : String,
            default: 'http://image.com'
        },

        email: {
            type : String,
            unique: true,
            required: true }
    }, 

)

module.exports = mongoose.model("User", Userschema)

