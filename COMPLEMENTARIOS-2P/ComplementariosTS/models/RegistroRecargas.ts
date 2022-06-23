import mongoose, { Schema, model } from "mongoose";
import { IRegistroRecarga } from '../Interfaces'
const RegistroRecargaSchema: mongoose.Schema = new Schema<IRegistroRecarga>({

    IdUsuario:{
        type: mongoose.Types.ObjectId, ref: "Usuario"
   },
   IdPlan:{
       type: mongoose.Types.ObjectId, ref: "Plan"
   },
   Estado: {
       type: Boolean,
       required: true,
       default: true,
   },

});
const RegistroRecarga: mongoose.Model<IRegistroRecarga> = model<IRegistroRecarga>('RegistroRecarga', RegistroRecargaSchema);
export {
    RegistroRecarga
}