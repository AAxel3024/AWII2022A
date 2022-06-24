import { Usuario } from '../models'
import { IUsuario } from '../Interfaces'
import { ErrorRequestHandler, Request, Response } from 'express';

const ObtenerUsuarios = async (req: Request, res: Response) => {
    const { Limite = '10', Desde = '0' } = req.query
    const query = { Estado: true };
    const [total, datos]: [Number, IUsuario[]] = await Promise.all(
        [
            Usuario.countDocuments(query),
            Usuario.find(query).skip(Number(Desde)).limit(Number(Limite))
        ])

    res.json({
        total,
        datos,
    })
}
const ObtenerUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario: IUsuario | null = await Usuario.findById(id);
    res.json(usuario);

}
const CrearUsuario = async (req: Request, res: Response) => {
    const { Estado, ...body } = req.body as IUsuario;
    const UsuarioExiste = await Usuario.findOne({
        Nombres: body.Nombres
    })
    if (UsuarioExiste) {
        return res.status(400).json({
            message: `El Usuario con ese nombre ya existe ${UsuarioExiste.Nombres}`
        })
    }
    const usuario = new Usuario(body);
    const UsuarioNuevo = await usuario.save();
    return res.status(201).json(UsuarioNuevo);
}
const ActualizarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { estado, ...body } = req.body;
    const UsuarioModificado = await Usuario.findByIdAndUpdate(id, body, { new: true });
    res.json(UsuarioModificado);
}
const BorrarUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const UsuarioBorrado = await Usuario.findByIdAndUpdate(id, { Estado: false }, { new: true })
    res.json(UsuarioBorrado);
}
export {
    ObtenerUsuarios,
    ObtenerUsuario,
    CrearUsuario,
    ActualizarUsuario,
    BorrarUsuario
}