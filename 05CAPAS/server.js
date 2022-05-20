const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
class Server{
    constructor(){
        this.app = express.Router();
        this.router = express.Router();
        this.port = process.env.PORT;
        this.paths = {
            productos: '/api/productos',
        }
        this.conectarBD();
        this.meddlewares();
        this.routes();
        this.router.use('/v1/sextoa', this.app);
        this._express = express().use(this.router)
    }
    async conectarBD(){
        await dbConnectio();
    }
        meddlewares(){
            this.app.use(cors());
            this.app.use(express.json());
        }
        routes(){
            this.app.use(this.paths.productos, require('./routes/producto'))
        }
        addListener(){
            this._express.listen(this.port, ()=>{
                console.log(`Servidor corriedo en puerto ${this.port}`)
            })
        }
}


module.exports = Server