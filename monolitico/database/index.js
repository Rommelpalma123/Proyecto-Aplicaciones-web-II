if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}
// exportamos los valores o credeneciales de mongo para q sea mas seguro 
module.exports = { 
    MONGO_URL: process.env.url
}