// llamamos a los demas modulos solo en archivo para no llamar a uno x uno y desinamos las rutas 
const Categoria = require('./categoria');
const Historial = require('./tareas.model');
const Session = require('./session.model');



module.exports = {
    Categoria,
    Historial,
    Session
}
