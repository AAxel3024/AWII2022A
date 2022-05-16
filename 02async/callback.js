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
// callback: funcion que tiene como parametro otra funcion. lo ultimo que se llama en la funion ya que es lo que nos retorna.
function buscarPlatoPorId(id, callback)
{
    const plato = platos.find( (plato)=> plato.id== id) ;
    if (!plato)
    {
        const error = new Error();
        error.massage = 'Plato no encontrado con id ${id}';
        return callback(error)
    }
    return callback(null, plato);
}
function buscarRestautantePorid(id, callback)
{
    const restaurante = restaurantes.find((restaurante)=> restaurante.id=== id); //5==='5
    if(!restaurante)
    {
        const error = new Error();
        err
    }
}



buscarPlatoPorId(22, (err, plato)=>{

    if(err)
    {
        console.log(err.message);
        return;
    }
    console.log(plato);
})