const express = require('express');
//const paras = require('../data/arreglo');
const route = express.Router();

const parametro= process.env.parametro||'v1';


route.get('/prueba', (req, res)=>{
    if(parametro == 'v1'){
        return res.status(200).send({message: 'Estas en la ruta 1'})
    }
    if(parametro == 'v2'){
        return res.status(200).send({message: 'Estas en la ruta 2'})
    }
})




module.exports=route