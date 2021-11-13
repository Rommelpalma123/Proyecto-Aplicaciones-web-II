const express = require('express');
const fs = require('fs'); 
const path = require('path'); // requerimos la libreira para path
const port = 8080;
const server = express(); // creamos funciones para express


const index = fs.readFileSync('./index.html'); // guardamos dentro de variables al llamdo de paginas html con readFileSync
const welcome = fs.readFileSync('./bienvenida.html'); // guardamos dentro de variables al llamdo de paginas html con readFileSync
const paginaError = path.join(__dirname,"./error.html"); // creamos una pagina global de error en caso de no encontrar alguna ruta


server.get('/', (req, res) => {

    res.write(index) // creamos la ruta principal el el cual llamamos al archivo html definido como index
}) 

server.get('/welcome', (req, res) => {

    res.write(welcome) // creamos la ruta principal el el cual llamamos al archivo html definido como index
}) 

server.use( (req, res, next) => {

    res.status(400).sendFile(paginaError); // creamos la ruta principal el el cual llamamos al archivo html definido como index
});

server.listen(port, () =>
{
    console.log(`conected to port http://localhost:${port}`);
})
