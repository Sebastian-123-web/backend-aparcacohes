const { response, request } = require('express');
const dbConexion = require('../database/config_db');
const { v4 : uuidv4 } = require('uuid');

const usuariosGet = (req, res = response) => {
    dbConexion.query('SELECT * FROM usuario', (err, usuarios, fields) => {
        if(!err){
            res.status(200).json(usuarios);
        }else{
            console.log(err);
        }
    });
}

const usuarioGet = (req = request, res = response) => {
    const { id } = req.params;
    dbConexion.query('SELECT * FROM usuario WHERE id_usuario = ?',[id] ,(err, usuario, fields) => {
        if(!err){
            res.status(200).json(usuario[0]);
        }else{
            console.log(err);
        }
    });
}

const usuarioPost = async(req, res = response) => {
    const { id = uuidv4(), nombre, telefono, correo } = req.body;

    dbConexion.query('INSERT INTO usuario (id_usuario, nombre, telefono, correo) VALUES (?, ?, ?, ?)', [id, nombre, telefono, correo],(err, usuario, fields) => {
        if(!err){
            res.status(201).json({Status: 'Usuario Guardado'});
        }else{
            console.log(err);
        }
    });
}

const usuarioPut = (req = request, res = responses) => {
    const { nombre, telefono, correo } = req.body;
    const { id } = req.params;

    dbConexion.query('UPDATE usuario SET nombre = ?, telefono = ?, correo = ? WHERE usuario.id_usuario = ?', [nombre, telefono, correo, id], (err, usuarios, fields) => {
        if(!err){
            res.status(202).json({Status: 'Usuario Actualizado'});
        }else{
            console.log(err);
        }
    });
}

const usuarioDelete = (req, res = responses) => {
    const { id } = req.params;

    dbConexion.query('DELETE FROM usuario WHERE usuario.id_usuario = ?',[id], (err, usuarios, fields) => {
        if(!err){
            res.status(200).json({Status: 'Usuario Eliminado'});
        }else{
            console.log(err);
        }
    });
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}