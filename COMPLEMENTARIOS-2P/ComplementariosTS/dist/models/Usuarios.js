"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    Cedula: {
        type: String,
        required: [true, 'La cedula del Usuario es obligatoria'],
        unique: true,
    },
    Nombres: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    CntViajes: {
        type: Number
    },
    Contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    TypeUser: {
        type: String,
        default: "User",
    },
    Estado: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Usuario = (0, mongoose_1.model)('Usuario', UsuarioSchema);
exports.Usuario = Usuario;
