import { RegistroRecarga, Usuario, Plan } from '../models'
import { IRegistroRecarga, IUsuario, IPlan } from '../Interfaces'
import { ErrorRequestHandler, Request, Response } from 'express';

const ObtenerRegistroRecargas = async (req: Request, res: Response)=>{
    const { Limite = 10, Desde = 0 } = req.query
    const query = { Estado: true };
    const [total, datos]: [Number, IRegistroRecarga[]] = await Promise.all(
        [
            RegistroRecarga.countDocuments(query),
            RegistroRecarga.find(query).populate('IdUsuario').populate('IdPlan').skip(Number(Desde)).limit(Number(Limite)),
        ])
    res.json({
        total,
        datos,
    })
}
const ObtenerRegistroRecarga = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registrorecarga : IRegistroRecarga | null | void = await RegistroRecarga.findById(id).populate('IdUsuario').populate('IdPlan').catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(registrorecarga);
}
const CrearRegistroRecarga = async (req: Request, res: Response) => {
    const { Estado, ...body } = req.body as IRegistroRecarga;
    const registrorecarga = new RegistroRecarga(body);
    try {
        const CntViajesUsu:IUsuario|any = await Usuario.findById(registrorecarga.IdUsuario);
        const CntViajesPlan:IPlan|any =await Plan.findById(registrorecarga.IdPlan);
        const UsuarioModificado:IUsuario|any = await Usuario.findByIdAndUpdate(registrorecarga.IdUsuario, { CntViajes: CntViajesUsu.CntViajes+CntViajesPlan.CntViajes}, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
        const RegistroRecargaNuevo = await registrorecarga.save()
        res.status(201).json({RegistroRecargaNuevo,UsuarioModificado});
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 'no es una id correcta'});
    }

}
const ActualizarRegistroRecarga = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Estado, ...body } = req.body as IRegistroRecarga;
    const registrorecarga = new RegistroRecarga(body);
    try {
        const RegistroRecargaActual:IRegistroRecarga|any = await RegistroRecarga.findById(id);
        const CntViajesUsuNuevo:IUsuario|any = await Usuario.findById(registrorecarga.IdUsuario).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }) });
        const CntViajesPlanNuevo:IPlan|any = await Plan.findById(registrorecarga.IdPlan).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }) });
        const UsuarioModificado:IUsuario|null|void = await Usuario.findByIdAndUpdate(registrorecarga.IdUsuario, { CntViajes: CntViajesUsuNuevo.CntViajes + CntViajesPlanNuevo.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
        //ahora restamos los viejos
        if (RegistroRecargaActual.Estado) {
            const CntViajesUsu:IUsuario|any = await Usuario.findById(RegistroRecargaActual.IdUsuario);
            const CntViajesPlan:IPlan|any = await Plan.findById(RegistroRecargaActual.IdPlan);
            const UsuarioDesModificado:IUsuario|null|void = await Usuario.findByIdAndUpdate(RegistroRecargaActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes - CntViajesPlan.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }) });
        }
        const RegistroRecargaModificado:IRegistroRecarga|null|void = await RegistroRecarga.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }) });
        res.json({RegistroRecargaModificado});
    } catch (error) {
        res.status(400).json({ status: 'Error', error: error});
    }
    
}
const BorrarRegistroRecarga = async (req: Request, res: Response) => {
    const { id } = req.params;
    const RegistroRecargaActual:IRegistroRecarga|any = await RegistroRecarga.findById(id);
    const CntViajesUsu:IUsuario|any = await Usuario.findById(RegistroRecargaActual.IdUsuario);
    const CntViajesPlan:IPlan|any= await Plan.findById(RegistroRecargaActual.IdPlan);
    const UsuarioDesModificado:IUsuario|null|void = await Usuario.findByIdAndUpdate(RegistroRecargaActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes - CntViajesPlan.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }) });
    const RegistroRecargaBorrado:IRegistroRecarga|null|void = await RegistroRecarga.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(RegistroRecargaBorrado);
}
export {
  ObtenerRegistroRecarga,
  ObtenerRegistroRecargas,
  ActualizarRegistroRecarga,
  BorrarRegistroRecarga,
  CrearRegistroRecarga
}