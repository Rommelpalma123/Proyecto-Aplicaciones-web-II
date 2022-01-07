const cors = require('cors');
const port = process.env.PORT || 9000;
const express = require('express'); // define rutas
const bodyParser = require('body-parser'); // texto sin formato
const mongoose = require('mongoose');
const { MONGO_URL } = require('./database');  
const chat = require('./routes/chat');

const app = express();

app.use(express.json());
app.use('/api/v2',chat);
app.use(cors())
app.use(
    bodyParser.json({
        limit: '20mb'
    })
)
app.use(
    bodyParser.urlencoded({
        limit:'20mb',
        extended: true
    })
)


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect base de dato microservicio chat'))
    .catch(e => console.log(e))
    

    app.listen(port, () =>{

        console.log(`Server listening on port http://localhost:${port}`);
    })