// llamamos a los demas modulos solo en archivo para no llamar a uno x uno y desinamos las rutas 
module.exports = {

    Historial: require("./tareas.model"),
    Session: require("./session.model")

}
