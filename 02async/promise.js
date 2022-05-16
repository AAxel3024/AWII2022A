const platos = [
    {
        id:1,
        descripcion:'Encebollado',
        idrestaurante:1,
    },
    {
        id:2,
        descripcion:'Ceviche',
        idrestaurante:1,
    },
    {
        id:3,
        descripcion:'Tigrillo',
        idrestaurante:2,
    },
    {
        id:4,
        descripcion:'Tostadas',
        idrestaurante:2,
    },

]
const restaurantes=[
    {
        id:1,
        nombre:'Lacarreta de Tono',
    },
    {
        id:2,
        nombre:'EncMiguelito Restaurante',
    },
]


// function buscarPlatoPorId(id)
// {
//     return new Promise((resolve, reject)=>{
//         const plato = platos.find((plato)=> plato.id=== id);
//         if(!plato)
//         {
//             const error = new Error();
//             error.message = `El plato con id ${id} no pudo ser encontrado`;
//             reject(error);
//         }
//         resolve(plato);

//     })

// }

function buscarRestaurantePorId(id)
{
    return new Promise((resolve, reject)=>{
        const restaurante = restaurante.find((restaurante)=> restaurante.id===id);
        if(!restaurante)
        {
            const error = new Error();
            error.message = `El restaurante con id ${id} no pudo ser encontrado`;
            reject(error);
        }
        
    })
}


buscarPlatoPorId(22).then((plato)=>{
    console.log(plato)
})
.catch((motivo)=>{
    console.log(motivo.message)
})


