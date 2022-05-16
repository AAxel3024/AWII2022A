const express = require('express');
const cors = require('cors');

const app = express();
const PUERTO = 2500;

app.use(cors()).use(express.json());

app.get('/prueba',(req,res,next)=>{
    next();
}, (req,res,next)=>{
    // res.status(200).send('prueba');
    res.status(200).send({mensajes:"Hola prueba"});
})

app.listen(PUERTO, ()=>{
    console.log(`Servidor ejecutandose en puerto ${PUERTO}`)
})

app.use('/prueba',(req,res,next)=>{
    req.body.nombre = req.body.nombre.toUpperCase();
    next();
})

app.post('/prueba',(req,res,next)=>{
    res.status(201).send(req,body);
})

app.use('/prueba', (req,res,next)=>{
    console.log(`Después de Middleware`);
//    res.status(201).send(req,body);
})