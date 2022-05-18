const {Schema, model} = require('mongoose')

const ProductoSchema = Schema ({
    Nombre:{
        type: String,
        required: [true, `El nombre del producto es obligatorio`],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    costo:{
        type: Number,
        default: 0
    },
    minimo:{
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
})

moduel.exports = model('Producto', ProductoSchema);