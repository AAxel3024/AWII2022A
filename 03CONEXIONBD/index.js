const mongoose = require('mongoose');
const conexion = "mongodb+srv://AAAC30:Adonis3024@cluster0.xomo0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
( async ()=>{
    const estadoConexion = await mongoose.connect(conexion);

    const Grupo = mongoose.model("Grupo", {nombre:String});
    const Permiso = mongoose.model("Permiso", {nombre:String})
    const Usuario = mongoose.model("Usuario", 
    {
        nombre: String,
        idgrupo: { type:mongoose.Types.ObjectId,ref:"Grupo"},
        // idpermisos: [{type: mongoose.Types.ObjectId, ref:"Permiso"}],
        permisos: [
            {
                permiso: {type: mongoose.Schema.Types.ObjectId, ref:"Permisos"},
                estado: {type: Boolean}
            }
        ]
    }
    );

    const grupo1 = new Grupo({nombre:"Administradires"});
    const guardoGrupo = await grupo1.save();
    const permiso1 = new Permiso({nombre:"Grabar"});
    const guardarPermiso1 = await permiso1.save();
    const permiso2 = new Permiso({nombre:"Eliminar"});
    const guardarPermiso2 = await permiso2.save();

    const usuario1 = new Usuario(
        {
            nombre:"Prueba sexto A",
            idgrupo: guardoGrupo._id,
            permisos: [
                {permiso: guardarPermiso1._id, estado:true},
                {permiso: guardarPermiso2._id, estado:true},
            ]
        }
    );
// const Usuario = mongoose.model("Usuario", {nombre: String} );
// const usuario1 = new Usuario({nombre:"Pueba sexto A"});
    // const resultado = await usuario1.save()
    const guardado = await usuario1.save();
    const resultado = await Usuario.find()
    .populate("idgrupo")
    .populate("permisos.permiso");
    console.log(resultado[4].permiso)
})();
