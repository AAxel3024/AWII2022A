import { Plan } from '../models'
import { IPlan } from '../Interfaces'
import { ErrorRequestHandler, Request, Response } from 'express';

const ObtenerPlanes= async (req: Request, res: Response)=>{
    const { Limite = 10, Desde = 0 } = req.query
    const query = { Estado: true };
    const [total, datos]: [Number, IPlan[]] = await Promise.all(
        [
            Plan.countDocuments(query),
            Plan.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ])
    res.json({
        total,
        datos,
    })
}
const ObtenerPlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    const plan : IPlan | null | void = await Plan.findById(id).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(plan);
}
const CrearPlan = async (req: Request, res: Response) => {
    const { Estado, ...body } = req.body as IPlan;
    const PlanExiste = await Plan.findOne({
        Nombre: body.Nombre
    })
    if (PlanExiste) {
        return res.status(400).json({
            message: `El plan  con ese Nombre ya existe: ${PlanExiste.Nombre}`
        })
    }
    const plan = new Plan(body);
    const PlanNuevo = await plan.save();
    res.status(201).json(PlanNuevo);
}
const ActualizarPlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Estado, ...body } = req.body as IPlan;
    const PlanModificado = await Plan.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(PlanModificado);
}
const BorrarPlan = async (req: Request, res: Response) => {
    const { id } = req.params;
    const PlanBorrado :IPlan | null | void = await Plan.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }) });
    res.json(PlanBorrado);
}
export {
  BorrarPlan, CrearPlan, ObtenerPlan, ObtenerPlanes, ActualizarPlan
}