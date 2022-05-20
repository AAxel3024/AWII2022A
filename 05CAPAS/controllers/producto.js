const {response}= require ('express')
const {Producto} = require('../models')

const obtenerProductos = async (req,res = response)  => {
    const {limite=10, desde=0} = req.query;
    const query = {estado:true};
    const[total, productos] = await Primise.all([
        await Producto.countDocuments(query),
        await Producto.find(query)
    ])
    res.json({
        total,
        productos
    })
}
const obtenerProducto = async (req, res) => {
        const {id} = req.params;
        const producto = await Producto.findById(id);
        res.json(producto);
}
const crearProducto = async  (req, res) => {
    const {estado, ...body} = req.body;

    const productExiste = await Producto.findOne({nombre:body.combre})
    if(productExiste)
    {
        res.status(400).json({
            message:
            `El producto con ese nombre ya existe ${productExiste.nombre}`
        })
    }
    const producto = new Producto(body);
    const productoNuevo = await producto.save();
    res.status(201).json(productoNuevo);
}

const actualzarProducto = async (req, res) =>{
    const {id} = req.params;
    const {estado, ...data} = req.body;
    const productoModificado = await Producto.findByIdAndUpdate(id, data, {new:true})
    res.json(productoModificado);
}
const borrarProducto = async (req, res) =>{
    const {id} = req.params
    const productoBorrado = await Producto.findByIdAndUpdate({id, estado:false}, {new:true});
    res.json(productoBorrado);
}
module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualzarProducto,
    borrarProducto
}