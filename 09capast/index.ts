import express from 'express'


const app = express();
const port = 3000;

app.get('/',(reg, res)=>{
    res.json({
        msg: 'ok'
    })
})

app.listen(port, ()=>{
    console.log ('Prueba funcionando')
})