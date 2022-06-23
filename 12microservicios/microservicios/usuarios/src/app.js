const express = require('express')
const app = express()

const respuesta = {
    data : [],
    arquitectura : 'Microservicio',
    descripcion : 'Usuarios Micro'
}


app.get('/api/v2/usuarios' , (req,res) =>{
    respuesta.data = []
    respuesta.data.push("Administrador","Superadministrador");
    console.log( "Microservicio Clientes")
    return res.send (respuesta);
})

module.exports = app;