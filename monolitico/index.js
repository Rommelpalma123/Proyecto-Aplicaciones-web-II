const path = require('path'); // requerimos la libreira para path
const cors = require('cors');
const port = process.env.PORT || 9000;
const express = require('express'); // define rutas
const bodyParser = require('body-parser'); // texto sin formato.
const mongoose = require('mongoose');
const { MONGO_URL } = require('./database');  
const chat = require('./routes/chat');
const home = require('./routes/home');
const user = require('./routes/user');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/users', chat, home, user );
app.set("view engine", "ejs")
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
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
    .then(() => console.log('Connect to mongo'))
    .catch(e => console.log('error al conectarse a la base de datos'))

app.listen(port, () =>{

    console.log(`Server listening on port http://localhost:${port}`);
})


























/*app.use(express.urlencoded({ extended: true }));
const SESSION_FILE_PATH = './session.json';
let client; // variables globales
let sessionData; // variables globales*/
//app.use('/api/users', require('./routes/user'));

/*const pusher = new Pusher({ 
    appId: "1301155",
    key: "0fc2c25246c719433348",
    secret: "0b9d79c4f6fbb2eba4a1",
    cluster: "us2",
    useTLS: true
    });*/

    /*const db = mongoose.connection;
    db.once("open" , () =>{
        //console.log(db)

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
    });*/
    

/*const sendWithApi = (req, res) => {

    const { message, to } = req.body;
    const newNumber = `${to}@c.us`;
    console.log(newNumber)
    console.log(message, to);
    sendMessage(newNumber, message)
    res.send({ status:'send'})
}

app.post('/send',sendWithApi);*/

// Metodo withSession
/*const withSession =  () => 
{

    // esta funcion servira para cargar una seccion existente en caso que esta este guardada
    const spinner = console.log(`${chalk.bgCyan.black('Logging in to whatsapp....')}`);
    sessionData = require(SESSION_FILE_PATH);
    //spinner.start(); 
    // Tenemos para cuando se conecte nuevo cliente
    client = new Client(
        {
            session : sessionData
        })
    // indicara si el cliente esta listo mostrara el mensaje que estara listo sino mostrara que hubo un error
    client.on('ready', () => 
    {
        console.log(`${chalk.yellow('Client is ready')}`);
        listenMessege();
    })
    client.on('auth_failure', () => 
    {
        //spinner.stop();
        console.log(`${chalk.red('Authentication error re-generate your code')}`);
    
    })
    client.initialize();
}

// Funcion encargada de generar el codigo qr 
const withOutSeccion = () => 
{
    console.log(`${chalk.green('No session has been started')}`);
    client = new Client(); // creamon un nuevo cliente para isiniciar sesion 
    client.on( 'qr', qr => // levantamos al cliente con el codigo 
    {
        console.log('qr'); // imprimimos el codigo qr
        qrcode.generate( qr, { small: true } ); // generamos de manera grafica el codigo qr en consola para ser escaneado
    });

    
    client.on( 'authenticated', (session) => // una vez iniciada aparecera el mensaje de autenticado
    {
        
        console.log(`${chalk.green('authenticated correct')}`);
        sessionData = session; // guardamos la sesion dentro de una variable para seguirla usando
        fs.writeFile( SESSION_FILE_PATH, JSON.stringify(session), (err) =>
        {
            if(err)
            {
                console.log(err);
            }
        });
    });

    client.initialize();
}

// funcion para recibir mensajes para

const listenMessege = () =>
{
    client.on('message', (msg) => 
    {
        const { from, to, body } = msg; 

        switch (body)
        {
            // preguntas frecuentes de un chat mediante los case para tener una respuesta distinta para cada pregunta
            case 'Hola':
                sendMessage(from, 'Hola, Permintenos darte la bienvenida del equipo FACCI, nuestro asistente te ayudará a resolver tus dudas')
                break;
            
            case 'Gracias': 
                sendMessage(from, '¿Que servicio deseas conocer?')
                break
            case 'La maya cirricular': 
                sendMessage(from, 'maya curricular')
                sendMedia(from, 'Notas.txt')
                break
            case 'Muchas gracias por tu ayuda':
                sendMessage(from, 'Es un gusto prestar nuestro servicio')
                break
            case 'Donde puedo encontrarlos':
                sendMessage(from, 'avenida manta, Universidad Laica "Eloy Alfaro de Manabi')
                break

            case 'De que lugar nos escribe':
                sendMessage(from, 'Hola, Permintenos darte la bienvenida a nuestro chatbox personalizado para la ayuda de sus actividades')
                break;
                
            case 'Horarios para primer semestre':
                sendMessage(from, 'En la pagina oficial de Facebook se publican todos los horarios')
                    break;

            case 'Cuando comienzan las clases':
                sendMessage(from, 'Las fechas establecidas para el nuevo periodo son el 22 de abril del 2022')
                        break;
            
            case 'Cuantos niveles de ingles hay que recibir':
                sendMessage(from, 'Para las mayas antiguas 3 niveles. Para las mayas rediseñadas son de 8 a 12 niveles segun la carrera.')
                break;

            case 'Como me puedo retirar de alguna materia':
                sendMessage(from, 'Debes ingresar al aula virtual, ingresa en la materia que deseas retirarte, en el pie de pagina estaeá el boton de retirarse')
                break;

            case 'En caso de querer retirarme de una materia, durante que tiempo lo debo hacer':
                    sendMessage(from, 'El tiempo es de 2 semanas habiles apartir del inicio del semestre.')
                    break;
            
            case 'Cuanto es el valor que debo cancelar en caso de perder una materia':
                sendMessage(from, 'El valor depende de los creditos que tenga la materia ')
                break;
            
            case 'Con quien puedo comunicarme para saber acerca de la carrera.':
                sendMessage(from, 'Con las secretarias de la facultad. En caso de querer mas información con el coordinador de carrera, el Ing Ruben Solorzano')
                break;
            }
        saveHistorial(from, body);
        console.log(`${chalk.cyan(body, from)}`);

        //console.log(`${chalk.yellow(body , from)}`);


    });
}

// metodo para enviar archivos media
const sendMedia = (to, file) => 
{
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`)
    client.sendMessage(to, mediaFile);
}

// envia el mensaje de y para 
const sendMessage = (to, message ) =>
{
    client.sendMessage(to, message)
    //client.sendMessage(from, message)

}
// hola Munodo 
// guarda el historial el numero y mensaje
const saveHistorial =  (number, message )   =>
{
    
    const pathChat = `./chats/${number}.xlsx`;
    const workbook = new exceljs.Workbook();
    const today = moment().format('DD-MM-YYYY hh:mm');

    if(fs.existsSync(pathChat))
    {
        workbook.xlsx.readFile(pathChat).then(() => 
        {
            const worksheet = workbook.getWorksheet(1);
            const lastRow = worksheet.lastRow;
            let getRowInsert = worksheet.getRow(++ (lastRow.number))
            getRowInsert.getCell('A').value = today;
            getRowInsert.getCell('B').value = message;
            getRowInsert.commit();
            workbook.xlsx.writeFile(pathChat)
            .then(() =>
            {
                console.log(`${chalk.green('Chat is added correctly')}`);
            })
            .catch(() => 
            {
                console.log(`${chalk.red('Something went wrong saving the chat')}`);
            })


        })
    }
    else
    {
        const worksheet = workbook.addWorksheet('Chats'); // se creara una hoja en excel 
        worksheet.columns = [

            { header: 'Fecha', key: 'Date'},
            { header: 'Message', key: 'message'},
        ]
        worksheet.addRow( [ today, message] );
        workbook.xlsx.writeFile(pathChat)
        .then(() => 
        {
            console.log('Historial created')
        })
        .catch((err) => 
        {
            console.log(err.message = chalk.red('Error creating chat'));
        })
    }
}

( fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSeccion(); // consicion ternaria


//Session.create (sessionData);*/

