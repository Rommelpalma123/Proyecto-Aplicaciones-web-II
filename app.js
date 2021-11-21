const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { MONGO_URL } = require('./database');    
const routes = require('./routes/chat.routes');

//const hola  = require('./dbmongo');
port = 5000;

const app = express();
app.use(cors());
app.use(routes);

app.listen(port, () =>{

    console.log(`Server listening on port http://localhost:${port}`);
})

    mongoose.connect(MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true},)
    .then(()  => console.log('Connected to database mongodb'))
    .catch(e  => console.log('error connect to database',e));





