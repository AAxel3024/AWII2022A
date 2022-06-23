import { Router } from 'express'
import { check } from 'express-validator'
import { RegistroRecarga } from '../controllers'
import funciones from '../middlewares'
const { validarCampos } = funciones
const { ActualizarRegistroRecarga,BorrarRegistroRecarga,CrearRegistroRecarga,ObtenerRegistroRecarga,ObtenerRegistroRecargas} = RegistroRecarga
const router = Router()
router.get('/', ObtenerRegistroRecargas);
router.get('/:id', check('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerRegistroRecarga);
router.post('/', check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearRegistroRecarga);
router.put('/:id', [check('_id', 'El id no es valido').isMongoId()],validarCampos,ActualizarRegistroRecarga);
router.delete('/:id', [check('_id', 'El id no es valido').isMongoId()], validarCampos,BorrarRegistroRecarga);
export { router }