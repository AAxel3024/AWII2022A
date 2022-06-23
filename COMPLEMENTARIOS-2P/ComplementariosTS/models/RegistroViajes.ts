import mongoose, { Schema, model } from "mongoose";
import { IRegistroViaje } from '../Interfaces'
const RegistroViajeSchema: mongoose.Schema = new Schema<IRegistroViaje>({

    IdBus: {
        type: mongoose.Types.ObjectId, ref: "Bus"
    },
    IdUsuario: {
        type: mongoose.Types.ObjectId, ref: "Usuario"
    },
    Estado: {
        type: Boolean,
        required: true,
        default: true,
    },

});
const RegistroViaje: mongoose.Model<IRegistroViaje> = model<IRegistroViaje>('RegistroViaje', RegistroViajeSchema);
export {
    RegistroViaje
}