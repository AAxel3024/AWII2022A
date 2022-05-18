const { Router } = require ('express');
const {check} = require('express-validator');
const {obtenerProducto,
        obtenerProductos,
        crearProducto,
        actualzarProducto,
        borrarProducto
} = require('../controllers').Producto;

const {validarcampos} = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos)
router.ger('/:id',[check('id','El id no es válido').isMongoId()], 
    obtenerProducto)
router.post('/',[check('nombre','El nombre es obligatorio').isEmpty()],
    crearProducto)
router.put('/:id', [check('id','El id no es válido').isMongoId()],
    actualzarProducto)
router.delete('/:id',[check('id','El id no es válido').isMongoId()], borrarProducto)

module.exports = router;