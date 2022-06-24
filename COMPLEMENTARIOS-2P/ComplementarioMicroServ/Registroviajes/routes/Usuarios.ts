import { Router } from 'express'
import { check } from 'express-validator'
import { Usuario } from '../controllers'
import funciones from '../middlewares'
const { validarCampos } = funciones
const { ActualizarUsuario,BorrarUsuario,CrearUsuario,ObtenerUsuario,ObtenerUsuarios} = Usuario
const router = Router()
router.get('/', ObtenerUsuarios);
router.get('/:id', check('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerUsuario);
router.post('/', check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearUsuario);
router.put('/:id', [check('_id', 'El id no es valido').isMongoId()],validarCampos,ActualizarUsuario);
router.delete('/:id', [check('_id', 'El id no es valido').isMongoId()], validarCampos,BorrarUsuario);
export { router }