const buses=[//
    {
        id:1,
        Numero:15,
        capacidad:50
    },
    {
        id: 2,
        Numero: 14,
        capacidad: 50
    },
    {
        id: 3,
        Numero: 17,
        capacidad: 50
    }
]
const usuarios = [
    {
        id: 1,
        cedula:"1350517171",
        Nombre:"Joffre Jesus Rodriguez Zambrano",
        Cnt_Viajes:40,
    },
    {
        id: 2,
        cedula: "1359403817",
        Nombre: "Axel Adonis Arteaga Cedeño",
        Cnt_Viajes: 20,
    },
    {
        id: 3,
        cedula: "1309763845",
        Nombre: "Diego Andres Flores Zambrano",
        Cnt_Viajes: 10,
    },
]
const choferes=[
    {
        id:1,
        Nombre:"Yoffre Emilio",
    },
    {
        id: 2,
        Nombre: "Carlos Palma",
    },
]
const planes=[
    {
        id:1,
        descripcion:"Semanal Simple",
        Cantidad_de_viajes:10,
        precio:4,
    },
    {
        id: 2,
        descripcion: "Semanal Doble",
        Cantidad_de_viajes: 20,
        precio: 8,
    },
]
const RegistroDeRecagas = [
    {
        id: 1,
        cedula: "1350517171",
        pago:4,
    },
]
module.exports = {
    buses,
    usuarios,
    choferes,
    planes,
    RegistroDeRecagas
}