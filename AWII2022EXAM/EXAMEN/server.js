const express = require('express')
const config = require('./config');

const route = require('./routes/ruta')

const app = express();

app.use(express.json());
app.use('/api/prueba', route);

app.listen(config.PORT, config.HOST, function () {
    console.log(`Servidor escuchando en http://${config.HOST}:${config.PORT}`);
});