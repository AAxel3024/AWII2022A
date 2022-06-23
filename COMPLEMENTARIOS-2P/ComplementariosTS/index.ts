// console.log("hola");
console.log("ok");
import { config } from 'dotenv'
config()
import { server } from './server'
const Server = new server
Server.listen();