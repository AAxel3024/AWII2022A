"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("hola");
console.log("ok");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server_1 = require("./server");
const Server = new server_1.server;
Server.listen();
