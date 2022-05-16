const { buses,usuarios,choferes,planes,RegistroDeRecagas} = require("./datos");
function RecargarPlan(CdUsu,IdPlan) {
    return new Promise((resolve, reject) => {//primero en la funcion tenemos que buscar si existe tanto el usuario, como el plan
        const usuario = usuarios.find((usuario) => usuario.cedula === CdUsu);
        const idplann = planes.find((idplann) => idplann.id === IdPlan)
        if (!usuario) {
            const error = new Error();
            error.message = 'El usuario con cd ${CdUsu} no pudo ser encontrado';//sino existe el usuario termina la promesa
            reject(error);
        }
        if (!idplann) {
            const error = new Error();
            error.message = 'El plan con id ${IdPlan} no pudo ser encontrado';//sino existe el plan termina la promesa
            reject(error);
        }
        usuario.Cnt_Viajes=usuario.Cnt_Viajes+idplann.Cantidad_de_viajes;//si existe tanto el usuario como el plan se le modifica el campo de cantidad de viajes al usuario.
        RegistroDeRecagas.push({id:2,cedula:usuario.cedula,pago:idplann.precio})//se añaden registros de historial
        resolve(usuario);//se devuelve el nuevo usuario
    })
}
RecargarPlan("1350517171",1)
    .then((usuario)=>{
        console.log("Se le recargo el plan de manera correcta:",usuario,RegistroDeRecagas);//se muestra el mensaje de exito, y el usuario
    })
    .catch(motivo=>{
        console.log(motivo.message);//se muestra el mensaje de eror
    })