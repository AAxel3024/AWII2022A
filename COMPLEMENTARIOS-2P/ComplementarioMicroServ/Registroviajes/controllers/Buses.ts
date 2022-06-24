import { Bus } from '../models'
import { IBus } from '../Interfaces'
import { ErrorRequestHandler, Request, Response } from 'express';

const ObtenerBuses= async (req: Request, res: Response)=>{
    const { Limite = 10, Desde = 0 } = req.query
    const query = { Estado: true };
    const [total, datos]: [Number, IBus[]] = await Promise.all(
        [
            Bus.countDocuments(query),
            Bus.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ])
    res.json({
        total,
        datos,
    })
}
const ObtenerBus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bus : IBus | null | void = await Bus.findById(id).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(bus);
}
const CrearBus = async (req: Request, res: Response) => {
    const { Estado, ...body } = req.body as IBus;
    const BusExiste = await Bus.findOne({
        Placa: body.Placa
    })
    if (BusExiste) {
        return res.status(400).json({
            message: `El Bus con esa Placa ya existe ${BusExiste.Placa}`
        })
    }
    const bus = new Bus(body);
    const BusNuevo = await bus.save();
    res.status(201).json(BusNuevo);
}
const ActualizarBus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Estado, ...body } = req.body as IBus;
    const BusModificado = await Bus.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(BusModificado);
}
const BorrarBus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const BusBorrado :IBus | null | void = await Bus.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(BusBorrado);
}
export {
    ObtenerBuses,
    ObtenerBus,
    CrearBus,
    ActualizarBus,
    BorrarBus
}