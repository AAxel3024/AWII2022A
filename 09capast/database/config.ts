import {connect} from "mongoose";


const dbConnection = async ()=>{
    try{
        console.log ('Base de datos ejecutandose sin problemas');
        await connect(process.env["MONGODB_CNN"] || "");
    } catch (error){
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}

export {
    dbConnection
}