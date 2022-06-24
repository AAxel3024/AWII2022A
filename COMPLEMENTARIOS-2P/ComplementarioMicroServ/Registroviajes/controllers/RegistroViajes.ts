import { RegistroViaje, Usuario, Bus } from '../models'
import { IRegistroViaje, IUsuario, IBus} from '../Interfaces'
import { ErrorRequestHandler, Request, Response } from 'express';

const ObtenerRegistroViajes = async (req: Request, res: Response)=>{
    const { Limite = 10, Desde = 0 } = req.query
    const query = { Estado: true };
    const [total, datos]: [Number, IRegistroViaje[]] = await Promise.all(
        [
            RegistroViaje.countDocuments(query),
            RegistroViaje.find(query).populate('IdUsuario').populate('IdBus').skip(Number(Desde)).limit(Number(Limite)),
        ])
    res.json({
        total,
        datos,
    })
}
const ObtenerRegistroViaje = async (req: Request, res: Response) => {
    const { id } = req.params;
    const registrorecarga : IRegistroViaje | null | void = await RegistroViaje.findById(id).populate('IdUsuario').populate('IdBus').catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(registrorecarga);
}
const CrearRegistroViaje = async (req: Request, res: Response) => {
    const { Estado, ...body } = req.body as IRegistroViaje;
    const registroviaje = new RegistroViaje(body);
    try {
        const CntViajesUsu:IUsuario|any = await Usuario.findById(registroviaje.IdUsuario);
        const UsuarioModificado: IUsuario | null | void = await Usuario.findByIdAndUpdate(registroviaje.IdUsuario, { CntViajes: CntViajesUsu.CntViajes -1 }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }) });
        const RegistroViajeNuevo = await registroviaje.save();
        res.status(201).json({ RegistroViajeNuevo, UsuarioModificado });
    } catch (error) {
        console.log (error)
        res.status(400).json({ status: 'no es una id correcta2' });
    }

}
const ActualizarRegistroViaje = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Estado, ...body } = req.body as IRegistroViaje;
    const registroviaje = new RegistroViaje(body);
    try {
        const RegistroViajeActual: IRegistroViaje | any = await RegistroViaje.findById(id);
        const CntViajesUsuNuevo: IUsuario | any = await Usuario.findById(registroviaje.IdUsuario).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }) });
        const UsuarioModificado: IUsuario | null | void = await Usuario.findByIdAndUpdate(registroviaje.IdUsuario, { CntViajes: CntViajesUsuNuevo.CntViajes - 1 }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
        //ahora aumentamos los viejos
        if (RegistroViajeActual.Estado) {
            const CntViajesUsu: IUsuario | any = await Usuario.findById(RegistroViajeActual.IdUsuario);
            const UsuarioDesModificado: IUsuario | null | void = await Usuario.findByIdAndUpdate(RegistroViajeActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes + 1 }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }) });
        }
        const RegistroViajeModificado: IRegistroViaje | null | void = await RegistroViaje.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }) });
        res.json({ RegistroViajeModificado });
    } catch (error) {
        console.log (error)
        res.status(400).json({ status: 'Error'});
    }
    
}
const BorrarRegistroViaje = async (req: Request, res: Response) => {
    const { id } = req.params;
    const RegistroViajeActual: IRegistroViaje | any = await RegistroViaje.findById(id);
    const CntViajesUsu: IUsuario | any = await Usuario.findById(RegistroViajeActual.IdUsuario);
    const UsuarioDesModificado: IUsuario | null | void = await Usuario.findByIdAndUpdate(RegistroViajeActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes +1 }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }) });
    const RegistroViajeBorrado: IRegistroViaje | null | void = await RegistroViaje.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(RegistroViajeBorrado);
}
export {
    ActualizarRegistroViaje,BorrarRegistroViaje,CrearRegistroViaje,ObtenerRegistroViaje,ObtenerRegistroViajes
}