const path = require('path'); // requerimos la libreira para path
const port = 8080;
const cors = require('cors');
const { Client, MessageMedia }  = require('whatsapp-web.js'); // exportamos la libreria para trabajar con un box de whatsapp web 
const qrcode = require('qrcode-terminal');  // libreria para convertit codigo en linea a codigo qr para poderlo leer con el scaner de whatsapp
const fs = require('fs'); 
const chalk = require('chalk'); // libreria que pinta los mensajes en la consola
const exceljs = require('exceljs'); // sirve como base de datos para guardar los chats
const express = require('express');
const bodyParser = require('body-parser');
const { send } = require('process')
const moment = require('moment'); // sirve para definir dias, meses, horas, etc.
//const server1 = require('./principal'); // es una conexion externa para habilitar un localhost en el navegador
const mongodb = require('./conexiondb.js'); // requiere una conexion externa
const server = express(); // creamos funciones para express


server.use(express.urlencoded( {extended: true} ));
server.use(cors());
server.use(

    bodyParser.json({
    })
)

server.use(

    bodyParser.urlencoded({
    })
)


const sendApi = (req, res) => {

    const {message, to } = req.body;
    console.log(message, to);
    const newNumber = `${to}@c.us`;
    sendMessage(newNumber, message)
    res.send({ status:'send'})
}

server.post('/send', sendApi)

const SESSION_FILE_PATH = './session.json';
let client; // variables globales
let sessionData; // variables globales

// Metodo withSession
const withSession =  () => 
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
        console.log('client is ready');
        listenMessege();
    })
    client.on('auth_failure', () => 
    {
        //spinner.stop();
        console.log('Authentication error re-generate your code');
    })
    client.initialize();
}

// Funcion encargada de generar el codigo qr 
const withOutSeccion = () => 
{
    console.log('No session has been started'); 
    client = new Client(); // creamon un nuevo cliente para isiniciar sesion 
    client.on( 'qr', qr => // levantamos al cliente con el codigo 
    {
        console.log('qr'); // imprimimos el codigo qr
        qrcode.generate( qr, { small: true } ); // generamos de manera grafica el codigo qr en consola para ser escaneado
    });

    
    client.on( 'authenticated', (session) => // una vez iniciada aparecera el mensaje de autenticado
    {
        console.log('authenticated correct')
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
            // preguntas frecuentes de un chat
            case 'hola':
                sendMessage(from, 'Hola como estas',)
                break;
            
            case 'bien': 
                sendMessage(from, 'bueno')
                break
            case 'que tal': 
                sendMessage(from, 'notepad')
                sendMedia(from, 'Notas.txt')
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

// guarda el historial el numero y mensaje
const saveHistorial =  (number, message ) =>
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
                console.log('Chat is added correctly');
            })
            .catch(() => 
            {
                console.log('Something went wrong saving the chat');
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
            console.log(err.message='Error creating chat');
        })
    }
}

( fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSeccion(); // consicion ternaria


//Session.create(sessionData);
server.listen(port, () =>
{
    console.log(`conected to port http://localhost:${port}`);
})