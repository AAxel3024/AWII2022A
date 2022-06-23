"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    Nombre: {
        type: String,
        required: [true, 'El Nombre del plan es obligatoria'],
        unique: true,
    },
    Descripcion: {
        type: String,
        required: [true, 'La descripcion del plan es obligatorio']
    },
    CntViajes: {
        type: Number,
    },
    Precio: {
        type: Number,
    },
    Estado: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Plan = (0, mongoose_1.model)('Plan', PlanSchema);
exports.Plan = Plan;
