import { Router } from 'express'
import { check } from 'express-validator'
import { RegistroViaje } from '../controllers'
import funciones from '../middlewares'
const { validarCampos } = funciones
const { ActualizarRegistroViaje,BorrarRegistroViaje,CrearRegistroViaje,ObtenerRegistroViaje,ObtenerRegistroViajes} = RegistroViaje
const router = Router()
router.get('/', ObtenerRegistroViajes);
router.get('/:id', check('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerRegistroViaje);
router.post('/', check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearRegistroViaje);
router.put('/:id', [check('_id', 'El id no es valido').isMongoId()],validarCampos,ActualizarRegistroViaje);
router.delete('/:id', [check('_id', 'El id no es valido').isMongoId()], validarCampos,BorrarRegistroViaje);
export { router }