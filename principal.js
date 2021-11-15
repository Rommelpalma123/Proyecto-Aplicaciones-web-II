const fs = require('fs'); 
const path = require('path'); // requerimos la libreira para path
const port = 8080;
const cors = require('cors');
//const server1 = require('./index'); // es una conexion externa para habilitar un localhost en el navegador
const express = require('express');
const server = express(); // creamos funciones para express
/*const index = fs.readFileSync('./index.html'); // guardamos dentro de variables al llamdo de paginas html con readFileSync
const welcome = fs.readFileSync('./bienvenida.html'); // guardamos dentro de variables al llamdo de paginas html con readFileSync
const paginaError = path.join(__dirname,"./error.html"); // creamos una pagina global de error en caso de no encontrar alguna ruta

server.use(express.urlencoded( {extended: true} ));
/*server.use(cors());
server.use(

    bodyParser.json({
    })
)

server.use(

    bodyParser.urlencoded({
    })
)*/
server.listen(port, ()=>
{
    console.log(`listen port http://localhost:${port}`)
})



