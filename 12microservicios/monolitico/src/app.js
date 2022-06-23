const express = require('express')
const app = express()

const respuesta = {
    data : [],
    arquitectura : 'Monolitico',
    descripcion : 'Acceso a todas las rutas en un solo cualquier cosa'
}
app.use((req,res,next)=>{
    respuesta.data = []
    next()
})

app.get('/api/v1/usuarios' , (req,res) =>{
    respuesta.data.push("Administrador","Superadministrador");
    return res.send (respuesta);
})
app.get('/api/v1/productos' , (req,res) =>{
    respuesta.data.push("Hamburguesa","Pizza","");
    return res.send (respuesta);
})
app.get('/api/v1/clientes' , (req,res) =>{
    respuesta.data.push("Consumidor finla","Ruben S");
    return res.send (respuesta);
})

module.exports = app;