import mongoose, { Schema, model } from "mongoose";
import { IBus } from '../Interfaces'
const BusSchema: mongoose.Schema = new Schema<IBus>({
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
const Bus: mongoose.Model<IBus> = model<IBus>('Bus', BusSchema);
export {
    Bus
}