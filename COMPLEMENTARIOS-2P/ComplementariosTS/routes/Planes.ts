import { Router } from 'express'
import { check } from 'express-validator'
import { Plan } from '../controllers'
import funciones from '../middlewares'
const { validarCampos } = funciones
const {ActualizarPlan, BorrarPlan, CrearPlan, ObtenerPlan, ObtenerPlanes} = Plan
const router = Router()
router.get('/', ObtenerPlanes);
router.get('/:id', check('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerPlan);
router.post('/', check('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearPlan);
router.put('/:id', [check('_id', 'El id no es valido').isMongoId()],validarCampos,ActualizarPlan);
router.delete('/:id', [check('_id', 'El id no es valido').isMongoId()], validarCampos,BorrarPlan);
export { router }