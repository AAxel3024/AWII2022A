const express = require('express')
const app = express()

const respuesta = {
    data : [],
    arquitectura : 'Microservicio',
    descripcion : 'Productos Microservicios'
}


app.get('/api/v2/productos' , (req,res) =>{
    respuesta.data = []
    respuesta.data.push("Pizza","Hamburguesa");
    console.log( "Microservicio Productos")
    return res.send (respuesta);
})

module.exports = app;