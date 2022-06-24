import { Router } from 'express'
import { check } from 'express-validator'
import { Bus } from '../controllers'
import funciones from '../middlewares'
const { validarCampos } = funciones
const {ActualizarBus,BorrarBus,CrearBus,ObtenerBus,ObtenerBuses} = Bus
const router = Router()
router.get('/', ObtenerBuses);
router.get('/:id', check('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerBus);
router.post('/', check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearBus);
router.put('/:id', [check('_id', 'El id no es valido').isMongoId()],validarCampos,ActualizarBus);
router.delete('/:id', [check('_id', 'El id no es valido').isMongoId()], validarCampos,BorrarBus);
export { router }