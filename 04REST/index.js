const cors = require('cors');
const express = require('express');

const app = express();
const ruta = express.Router();
const PUERTO = 3000;
let comidas = [];

app.use(cors()).use(express.json());

ruta.get('/',(req,res)=>{
    res.status(200).send(comidas);
    const{body} = req;
    if (comidas.filter(c=> c.codigo===body.codigo).length>0)
    {
        res.status(400).send({
            message: `El código ya existe`,
            response: body
        })
    }
    comidas.push(body);
    res.status(201).send({
        message: `El dato se inserto correctamente`,
        response: body
    })
})
ruta.post('/',(req,res)=>{

})

ruta.get('/')
ruta.get('/:id')
ruta.post('/')
ruta.put('/')
ruta.delete('/')


app.use('/comida', ruta);
app.listen(PUERTO, ()=>{
    console.log(`Servidor funcionando en http://localhost:${PUERTO}`)
})