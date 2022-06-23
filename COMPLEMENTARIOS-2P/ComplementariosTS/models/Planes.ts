import mongoose, { Schema, model } from "mongoose";
import { IPlan } from '../Interfaces'
const PlanSchema: mongoose.Schema = new Schema<IPlan>({
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
const Plan: mongoose.Model<IPlan> = model<IPlan>('Plan', PlanSchema);
export {
    Plan
}