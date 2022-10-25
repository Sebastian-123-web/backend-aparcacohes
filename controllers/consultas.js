const { response, request } = require('express');
const dbConexion = require('../database/config_db');
const { v4: uuidv4 } = require('uuid');

const getAllUsuarioVehiculos = (req = request, res = response) => {
    dbConexion.query('SELECT * FROM usuario INNER JOIN vehiculo ON vehiculo.id_usuario= usuario.id_usuario INNER JOIN tipo ON tipo.id_tipo=vehiculo.id_tipo', (err, estadoV, fields) => {
        if(!err){
            res.json(estadoV);
        }else{
            console.log(err);
        }
    });
}

/*
const addUsuarioVehiculo = (req = request, res = response) => {
    dbConexion.query('SELECT * FROM usuario INNER JOIN vehiculo ON vehiculo.id_usuario= usuario.id_usuario', (err, estadoV, fields) => {
        if(!err){
            res.json(estadoV);
        }else{
            console.log(err);
        }
    });
}


const addUsuario = async(req, res = response) => {
    const { id = uuidv4(), nombre, telefono, correo } = req.body;

    dbConexion.query('INSERT INTO usuario (id_usuario, nombre, telefono, correo) VALUES (?, ?, ?, ?)', [id, nombre, telefono, correo],(err, usuario, fields) => {
        if(!err){
            res.status(201).json({Status: 'Usuario Guardado'});
        }else{
            console.log(err);
        }
    });
}
*/

const addUsuarioVehiculo = (req = request, res = response) => {
    const { id = uuidv4(), nombre, placa, estado="false", modelo, tipo } = req.body;
    //AGREGAR QUERY PARA ENVIAR A BASE DE DATOS
    dbConexion.query('INSERT INTO usuario (id_usuario, nombre) VALUES (?, ? )', [id, nombre],(err, usuario, fields) => {
        if(!err){
            dbConexion.query('INSERT INTO vehiculo (id_vehiculo, placa, modelo, estado, id_tipo, id_usuario) VALUES (NULL, ?, ?, ?, ?, ?)', [placa, modelo, estado, tipo, id],(err, usuario, fields) => {
                if(!err){
                    dbConexion.query(`SELECT id_vehiculo FROM vehiculo WHERE id_usuario = ? `, [id],(err, id_vehiculo, fields) => {
                        if(!err){
                            res.status(201).json({titulo: 'Completado', descr: 'Usuario y Vehiculo Guardado',estado: 'success', id_vehiculo: id_vehiculo[0]});
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log(err);
                }
            });
        }else{
            console.log(err);
        }
    });
}


const updateVehiculo = (req = request, res = response) => {
    const { estado, idVehiculo } = req.body;
    const estadoV = JSON.stringify(estado);
    const query = `UPDATE vehiculo SET estado = ${ estadoV } WHERE vehiculo.id_vehiculo = ${ idVehiculo }`;
    dbConexion.query(query, (err, usuario, fields) =>{
        if(!err){
            res.status(201).json({titulo: 'Completado', descr: 'Vehiculo en Garaje',estado: 'success'});
        }else{
            console.log(err);
        }
    } )
}


module.exports = {
    getAllUsuarioVehiculos,
    addUsuarioVehiculo,
    updateVehiculo
};