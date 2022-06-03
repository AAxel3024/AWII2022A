const express = require('express');

const app = express();

const port = 4200;

const routes = require('./routes/ruta');

app.use(express.json());
app.use('/api', routes);

app.listen(port,function(){
    console.log("Servidor Corriendo");
})

module.exports = app;