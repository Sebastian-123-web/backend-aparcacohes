const { response } = require('express');
const dbConexion = require('../database/config_db');

const tipoGet = (req, res = response) => {

    dbConexion.query('SELECT * FROM tipo', (err, tipo, fields) => {
        if(!err){
            res.json({tipo});
        }else{
            console.log(err);
        }
    });
}

const usuarioPost = async(req, res = response) => {

    const body = req.body;
    const cliente = new Cliente(body);

    await cliente.save(); //GUARDA EN LA DB

    res.json({
        cliente
    });
}

const usuarioPut = (req, res = responses) => {

    const { id } = req.params;

    res.json({
        msg: 'API put  - controlador',
        nombre: 'Sebastian',
        id
    });
}

const usuarioDelete = (req, res = responses) => {
    res.json({
        msg: 'API delete - controlador',
        nombre: 'Sebastian'
    });
}

module.exports = {
    tipoGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}