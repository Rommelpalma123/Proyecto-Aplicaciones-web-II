if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}
// exportamos los valores o credeneciales de mongo para q sea mas seguro 
module.exports = { 
    mongo_url: process.env.mongo_url,
    port: process.env.port
}