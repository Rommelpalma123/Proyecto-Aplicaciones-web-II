const { Client } = require('whatsapp-web.js'); // exportamos la libreria para trabajar con un box de whatsapp web 
const qrcode = require('qrcode-terminal');  // libreria para convertit codigo en linea a codigo qr para poderlo leer con el scaner de whatsapp
const fs = require('fs'); 
const chalk = require('chalk');
const ora = require('ora');

const SESSION_FILE_PATH = './session.json';
let client;
let sessionData; 

const withSession = () => 
{
    // esta funcion servira para cargar una seccion existente en caso que esta este guardada
    const spinner = ora(`Cargando ${chalk.yellow('validando la sesion de whatsapp....')}`);
    sessionData = require(SESSION_FILE_PATH);
    spinner.start(); 
    client = new Client({ session: sessionData })

    client.on('Ready', () => 
    {
        console.log('client is ready to work')
        spinner.stop();
    })
}

// Funcion encargada de generar el codigo qr 
const withOutSeccion = () => 
{
    console.log('No se ha iniciado ninguna sesion'); 
    client = new Client(); // creamon un nuevo cliente para isiniciar sesion 
    client.on( 'qr', qr => // levantamos al cliente con el codigo 
    {
        console.log('qr'); // imprimimos el codigo qr
        qrcode.generate( qr, { small: true } ); // generamos de manera grafica el codigo qr en consola para ser escaneado
    });


    client.on( 'authenticated', (session) => // una vez iniciada aparecera el mensaje de autenticado
    {
        sessionData = session; // guardamos la sesion dentro de una variable para seguirla usando
        fs.writeFile( SESSION_FILE_PATH, JSON.stringify( session ), (err) =>
        {
            if(err)
            {
                console.log(err);
            }
        });
    });

    client.initialize();
}


( fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSeccion(); // consicion ternaria
