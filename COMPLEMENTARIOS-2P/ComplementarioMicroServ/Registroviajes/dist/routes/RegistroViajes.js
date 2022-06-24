"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = __importDefault(require("../middlewares"));
const { validarCampos } = middlewares_1.default;
const { ActualizarRegistroViaje, BorrarRegistroViaje, CrearRegistroViaje, ObtenerRegistroViaje, ObtenerRegistroViajes } = controllers_1.RegistroViaje;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', ObtenerRegistroViajes);
router.get('/:id', (0, express_validator_1.check)('id', 'Debe ser un id de mongo Valido').isMongoId(), validarCampos, ObtenerRegistroViaje);
router.post('/', (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').notEmpty(), validarCampos, CrearRegistroViaje);
router.put('/:id', [(0, express_validator_1.check)('_id', 'El id no es valido').isMongoId()], validarCampos, ActualizarRegistroViaje);
router.delete('/:id', [(0, express_validator_1.check)('_id', 'El id no es valido').isMongoId()], validarCampos, BorrarRegistroViaje);
