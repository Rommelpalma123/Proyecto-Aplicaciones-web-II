const express =  require('express');
const cors = require('cors');

const { dbConnection } =  require('./src/database/conexiondb');


class Server 
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            productos: '/api/productos'
        }

        this.conectarDB();
        this.middlewares();
        this.routes();

    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
        this.app.use( '/uploads/', express.static('uploads'))

    }
    routes(){
        this.app.use(this.paths.productos, require('./src/routes/pruductos')   )
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor ejecuntando en puerto ${this.port}`)
        })
    }


}
module.exports = Server;