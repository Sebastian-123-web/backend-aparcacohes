const express = require('express');
const cors = require('cors');
const db = require('../database/config_db')


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRoute = '/api/usuario';
        this.consultasRoute = '/api/v1/consultas';
        
        //CONECTAR A LA BASE DE DATOS
        this.conectarDB();

        this.middleware();
        this.router();
    }

    async conectarDB(){
        try {
            await db.connect();
            console.log('Base de Datos conectada');
        } catch (error) {
            throw new Error('Error al Conectar con la DB');
        }
    }

    router(){
        this.app.use(this.usuarioRoute, require('../routes/usuarios'));
        this.app.use(this.consultasRoute, require('../routes/consultas'));
    }

    middleware(){
        this.app.use(cors());

        this.app.use( express.json() );
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}
module.exports = Server;