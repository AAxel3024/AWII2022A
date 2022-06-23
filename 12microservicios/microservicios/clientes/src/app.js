const express = require('express');
const app = express();

const respuesta = {
    data : [],
    arquitectura : 'Microservicio',
    descripcion : 'Cliente Micro',
}


app.get('/api/v2/clientes' , (req,res) =>{
    respuesta.data = []
    respuesta.data.push("Consumidor finla","Carlos R");
    console.log( "Microservicio Clientes")
    return res.send (respuesta);
})

module.exports = app;