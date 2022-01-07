const cors = require('cors');
const port = process.env.PORT || 9000;
const express = require('express'); // define rutas
const bodyParser = require('body-parser'); // texto sin formato
const mongoose = require('mongoose');
const { MONGO_URL } = require('./database');  
const Pusher = require('pusher');   
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


const pusher = new Pusher({ 
    appId: "1301155",
    key: "0fc2c25246c719433348",
    secret: "0b9d79c4f6fbb2eba4a1",
    cluster: "us2",
    useTLS: true
    });
    
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect'))
    .catch(e => console.log(e))
    const db = mongoose.connection;
    db.once("open" , () =>{
    
        console.log('db coneccted');
    
        const msgCollection = db.collection('messageconstents')
        const changeStream = msgCollection.watch();
        changeStream.on("change", (change) =>{
    
            console.log('a change acurred',change);
    
            if(change.operationType === "insert")
            {
                const messageDetails = change.fullDocument;
                pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                });
            }
            else 
            {
                console.log('error triggering pusher');
            }
        });
    });
    

    app.listen(port, () =>{

        console.log(`Server listening on port http://localhost:${port}`);
    })