"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importStar(require("express"));
const config_1 = require("./database/config");
const cors_1 = __importDefault(require("cors"));
const Usuarios_1 = require("./routes/Usuarios");
const Buses_1 = require("./routes/Buses");
const Planes_1 = require("./routes/Planes");
const RegistroRecargas_1 = require("./routes/RegistroRecargas");
const RegistroViajes_1 = require("./routes/RegistroViajes");
class server {
    constructor() {
        this.app = (0, express_1.Router)();
        this.router = (0, express_1.Router)();
        this.port = Number(process.env["PORT"]);
        this.paths = {
            usuarios: '/api/usuarios',
            buses: '/api/buses',
            planes: '/api/planes',
            registrorecargas: '/api/registrorecargas',
            registroviajes: '/api/registroviajes'
            //añadir mas si se necesitan
        };
        this.conextarDB();
        this.middlewares();
        this.routes();
        this.router.use('/v1/sextoa', this.app);
        this.app.use((req, res, next) => {
            res.status(400).send({
                message: "no existe la ruta"
            });
        });
        this._express = (0, express_1.default)().use(this.router);
    }
    conextarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.DBConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.usuarios, Usuarios_1.router);
        this.app.use(this.paths.buses, Buses_1.router);
        this.app.use(this.paths.planes, Planes_1.router);
        this.app.use(this.paths.registrorecargas, RegistroRecargas_1.router);
        this.app.use(this.paths.registroviajes, RegistroViajes_1.router);
    }
    listen() {
        this._express.listen(this.port, () => {
            console.log(`Servidor ejecutando en http://localhost:${this.port}/v1/sextoa/api/usuarios`);
        });
    }
}
exports.server = server;