const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.mongo_url,{ useNewUrlParser: true, useUnifiedTopology: true},{
        });
        console.log('Connected to mongodb ');
    } catch (error) {
        console.log(error);
        throw new Error('Error to coneccted to mongo db');
    }


}



module.exports = {
    dbConnection
}

//const chalk = require('chalk');
/*const mongoose = require('mongoose');// requerir una libreria de  mongosse para conecctarse ala base de dato 



    mongoose.connect( process.env.mongo_url)
    .then(console.log('Base de datos online'))
    .catch((e) =>
    {
        console.log('Error a la hora de iniciar la base de datos',e);
    }) 
*/