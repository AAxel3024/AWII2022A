import express, { Router } from 'express'
import { DBConnection } from './database/config';
import cors from 'cors';
import { router as usuarios} from './routes/Usuarios'
import { router as buses} from './routes/Buses'
import { router as registroviajes} from './routes/RegistroViajes'
import { Request, Response, NextFunction } from 'express';
class server {
    app: Router
    router: Router
    port: Number
    paths: { [key: string]: string };
    private _express: express.Express;
    constructor() {
        this.app = Router();
        this.router = Router();
        this.port = Number(process.env["PORT"])
        this.paths = {
            usuarios: '/api/usuarios',
            buses: '/api/buses',
            registroviajes: '/api/registroviajes'
            //añadir mas si se necesitan
        }
        this.conextarDB()
        this.middlewares()
        this.routes()
        this.router.use('/v1/sextoa', this.app);
        this.app.use((req: Request, res: Response, next: NextFunction) => {//verificar que no exista la ruta
            res.status(400).send({
                message: "no existe la ruta"
            })
        })
        this._express = express().use(this.router);
    }
    private async conextarDB() {//modificadores de acceso son los private
        await DBConnection();
    }
    private middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    private routes() {
        this.app.use(this.paths.usuarios, usuarios);
        this.app.use(this.paths.buses, buses);
        this.app.use(this.paths.registroviajes, registroviajes);

    }
    listen() {
        this._express.listen(this.port, () => {
            console.log(`Servidor ejecutando en http://localhost:${this.port}/v1/sextoa/api/registroviajes`);
        })
    }
}
export { server }