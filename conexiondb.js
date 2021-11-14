const mongoose = require('mongoose');// requerir una libreria de  mongosse para conecctarse ala base de dato 

const { mongo_url } = require('./config');   // en carpeta config  se estan guardando las credenciales de la base de  dato 

    // esta requeriendo la libreria  de  mongoose  para conectarse a la base de dato por medio de las credenciales 
    mongoose.connect(mongo_url,{ useNewUrlParser: true, useUnifiedTopology: true},)
    .then(()  => console.log('Connected to database mongodb'))
    .catch(e  => console.log('error connect to database',e))   
