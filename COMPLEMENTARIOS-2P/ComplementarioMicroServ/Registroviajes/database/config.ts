// const mongoose = require('mongoose');
import { connect } from "mongoose";
const DBConnection = async () => {
    try {
        console.log("Conexion Exitosa");
        await connect(process.env["MONGODB_CNN"] || "");
    } catch (error) {
        console.log(error);
        throw new Error(`ERROR No se pudo conectar a la base de datos`)
    }
}
export {
    DBConnection
}