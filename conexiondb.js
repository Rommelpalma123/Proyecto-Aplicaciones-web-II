const chalk = require('chalk');
const mongoose = require('mongoose');// requerir una libreria de  mongosse para conecctarse ala base de dato 

    const dbConnection = async ()=>{

        try{
            await mongoose.connect( process.env.mongo_url);
            console.log('Base de datos escuchando')
        }
        catch(error){
            console.log(error);
            throw new Error('Error al conectarse con la base de datos')
        }
    
    }
    module.exports = {
        dbConnection
    }