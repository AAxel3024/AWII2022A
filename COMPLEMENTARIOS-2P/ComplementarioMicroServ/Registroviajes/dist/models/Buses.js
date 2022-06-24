"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const mongoose_1 = require("mongoose");
const BusSchema = new mongoose_1.Schema({
    Placa: {
        type: String,
        required: [true, 'La Placa del Bus es obligatoria'],
        unique: true,
    },
    NumeroBus: {
        type: String,
        required: [true, 'El Numero del Bus es obligatorio']
    },
    Capacidad: {
        type: Number,
        default: 0,
    },
    CedChofer: {
        type: String,
        required: [true, 'La Cedula del Chofer es obligatoria'],
        unique: true,
    },
    NombresChofer: {
        type: String,
        required: [true, 'El Nombre del Chofer es obligatorio']
    },
    Contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    Estado: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Bus = (0, mongoose_1.model)('Bus', BusSchema);
exports.Bus = Bus;
