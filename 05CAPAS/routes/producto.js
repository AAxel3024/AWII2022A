const { Router } = require ('express');
const {check} = require('express-validator');
const {obtenerProducto,
        obtenerProductos,
        crearProducto,
        actualzarProducto,
        borrarProducto
} = require('../controllers').Producto;

const {validarCampos} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos)
router.get('/:id',[check('id','El id no es válido').isMongoId(), validarCampos], 
    obtenerProducto)
router.post('/',[check('Nombre','El nombre es obligatorio').not().isEmpty(), validarCampos],
    crearProducto)
router.put('/:id', [check('id','El id no es válido').isMongoId(), validarCampos],
    actualzarProducto)
router.delete('/:id', borrarProducto)

module.exports = router;