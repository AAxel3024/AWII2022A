const express = require('express');

const api = express.Router();

api.get('/v1', (req, res) => {

    res.send({message: 'Ruta 1'})

})

api.get('/v2', (req, res) => {

    res.send({message: 'Ruta 2'})

})

module.exports = api;