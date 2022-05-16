const mongoose = require('mongoose');
const { usuarios } = require('./datos');
const conexion = "mongodb+srv://jofrerz:JoFrE159RZ@cluster0.ksnvz.mongodb.net/Proyecto?retryWrites=true&w=majority";
(async()=>{
    const estado = await mongoose.connect(conexion);
    const Usuario = mongoose.model("Usuario", { Cedula: String, Nombre: String, CntViajes: Number });
    const Buses = mongoose.model("Buses", { NumeroBus: Number, Capacidad: Number, CedChofer: String, NombreChofer: String });
    const Planes = mongoose.model("Planes", { Descripcion: String, CntViajes: Number, Precio: Number });
    const RegistroRecargas = mongoose.model("RegistroRecargas",
        {
            IdUsuario: { type: mongoose.Types.ObjectId, ref: "Usuario" },
            IdPlan: { type: mongoose.Types.ObjectId, ref: "Planes" },
        }
    );
    const RegistroViajes = mongoose.model("RegistroViajes",
        {
            IdBus: { type: mongoose.Types.ObjectId, ref: "Planes" },
            Usuarios: [{ type: mongoose.Types.ObjectId, ref: "Usuario" }],
        }
    );
    // const usuario1 = new Usuario({ Cedula: '1316318623', Nombre: 'Gustavo Rodriguez', CntViajes:20, });
    // const guardar = await usuario1.save();
    // const Bus1 = new Buses({ NumeroBus:15, Capacidad:35, CedChofer: '1316854965', NombreChofer: 'Axel Arteaga' });
    // const guardarbus = await Bus1.save();
    // const Plan1 = new Planes({ Descripcion: 'Mensual Simple', CntViajes:80, Precio:16 })
    // const guardarplan = await Plan1.save();
    // const resultado = await Usuario.find()
    // console.log(resultado); Ingresos
    function RecargarPlan(CdUsu, IdPlan) {
        return new promise((resolve, reject) => {
            const usu = Usuario.find({Cedula:CdUsu});
            
        })

    }
})();