import mongoose, { Schema, model } from "mongoose";
import { IUsuario } from '../Interfaces'
const UsuarioSchema: mongoose.Schema = new Schema<IUsuario>({
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
const Usuario: mongoose.Model<IUsuario> = model<IUsuario>('Usuario', UsuarioSchema);
export {
    Usuario
}
