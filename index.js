const { Client, MessageMedia }  = require('whatsapp-web.js'); // exportamos la libreria para trabajar con un box de whatsapp web 
const qrcode = require('qrcode-terminal');  // libreria para convertit codigo en linea a codigo qr para poderlo leer con el scaner de whatsapp
const fs = require('fs'); 
const chalk = require('chalk');
const exceljs = require('exceljs');
const moment = require('moment');
//const  ora = require('ora');

const mongoose = require('mongoose');
const express = require('express');
const { mongo_url } = require('./config');    
const { Historial }      = require('./models');

const SESSION_FILE_PATH = "./session.json";
let client;
let sessionData; 

const withSession =  () => 
{
    // esta funcion servira para cargar una seccion existente en caso que esta este guardada
    const spinner = console.log(`Cargando ${chalk.yellow('validando la sesion de whatsapp ...')}`)
    sessionData = require(SESSION_FILE_PATH);
    //spinner.start(); 
    client = new Client(
        {
            session : sessionData
        })

    client.on('ready', () => 
    {
        console.log('client is ready');
        listenMessege();
    })
    client.on('auth_failure', () => 
    {
        //spinner.stop();
        console.log('Error de autenticacion vuelva a generar su codigo');
    })
    client.initialize();
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

        console.log(`${chalk.yellow(body)}`);
    });
}

const sendMedia = (to, file) =>  
{
    const mediaFile = MessageMedia.fromFilePath(`./mediaSend/${file}`)
    client.sendMessage(to, mediaFile);
}

const sendMessage = ( to, message ) => 
{
    client.sendMessage(to, message)
}

const saveHistorial =  (number, message ) =>
{
    const pathChat = './chats/${number}.xlxs';
    const workbook = new exceljs.Workbook();
    const today = moment().format('DD-MM-YYYY hh:mm');

    if(fs.existsSync(pathChat))
    {
        workbook.xlxs.readFile(pathChat).then(() => 
        {

        })
    }
    else
    {
        const worksheet = workbook.addWorksheet('Chats');
        worksheet.columns = [

            { header: 'Fecha', key: 'Date'},
            { header: 'Message', key: 'message'},
        ]
        worksheet.addRow( [ today, message] );
        workbook.xlxs.writeFile(pathChat)
        .then(() => 
        {
            console.log('Historial created')
        })
        .catch((err) => 
        {
            console.log('Error creating chat')
        })
    }
}

( fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSeccion(); // consicion ternaria