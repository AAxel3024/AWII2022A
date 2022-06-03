const express = require('express');
const vehiculoss = require('../persistence/arreglos');
const route = express.Router();
const {    
    Buscar,
    Guardar} 
= require('../controllers/index')


route.get('/buscar',Buscar)

route.post('/agregar',Guardar)




module.exports=route