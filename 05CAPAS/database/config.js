const mongoose = require('mongoose');

const conexion = async ()=>{
    try {
        await mongoose.connect (process.env.MONGODB_CNN)
        console.log(`Base de datos conectada...`);

    } catch (error) {
        console.log(`No se pudo conectar a base de datos`);
        throw new Error(`Error al conectarse a la base de datos`);
    }
   
}


module.exports={
    dbConnection
}
