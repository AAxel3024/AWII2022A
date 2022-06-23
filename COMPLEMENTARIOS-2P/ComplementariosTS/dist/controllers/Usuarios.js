"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrarUsuario = exports.ActualizarUsuario = exports.CrearUsuario = exports.ObtenerUsuario = exports.ObtenerUsuarios = void 0;
const models_1 = require("../models");
const ObtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Limite = '10', Desde = '0' } = req.query;
    const query = { Estado: true };
    const [total, datos] = yield Promise.all([
        models_1.Usuario.countDocuments(query),
        models_1.Usuario.find(query).skip(Number(Desde)).limit(Number(Limite))
    ]);
    res.json({
        total,
        datos,
    });
});
exports.ObtenerUsuarios = ObtenerUsuarios;
const ObtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield models_1.Usuario.findById(id);
    res.json(usuario);
});
exports.ObtenerUsuario = ObtenerUsuario;
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { Estado } = _a, body = __rest(_a, ["Estado"]);
    const UsuarioExiste = yield models_1.Usuario.findOne({
        Nombres: body.Nombres
    });
    if (UsuarioExiste) {
        return res.status(400).json({
            message: `El Usuario con ese nombre ya existe ${UsuarioExiste.Nombres}`
        });
    }
    const usuario = new models_1.Usuario(body);
    const UsuarioNuevo = yield usuario.save();
    return res.status(201).json(UsuarioNuevo);
});
exports.CrearUsuario = CrearUsuario;
const ActualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const UsuarioModificado = yield models_1.Usuario.findByIdAndUpdate(id, body, { new: true });
    res.json(UsuarioModificado);
});
exports.ActualizarUsuario = ActualizarUsuario;
const BorrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const UsuarioBorrado = yield models_1.Usuario.findByIdAndUpdate(id, { Estado: false }, { new: true });
    res.json(UsuarioBorrado);
});
exports.BorrarUsuario = BorrarUsuario;
