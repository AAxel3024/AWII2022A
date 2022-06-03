const express = require('express');
const vehiculoss = require('../persistence/arreglos')



const Buscar = async(req, res) => {
    res.status(200).send({
        datos: vehiculoss,
        message: 'Funciona :D'
    });
}

const Guardar = async(req, res) => {
    const {...body} = req.body;
    const save = vehiculoss.push(body)
    if(save === 1){
        res.status(200).json(body)
    }else{
        res.status(400).send({message: 'Ha sucedio un error'})
    }

}



module.exports={
    Buscar,
    Guardar
}