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
exports.CrearRegistroRecarga = exports.BorrarRegistroRecarga = exports.ActualizarRegistroRecarga = exports.ObtenerRegistroRecargas = exports.ObtenerRegistroRecarga = void 0;
const models_1 = require("../models");
const ObtenerRegistroRecargas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Limite = 10, Desde = 0 } = req.query;
    const query = { Estado: true };
    const [total, datos] = yield Promise.all([
        models_1.RegistroRecarga.countDocuments(query),
        models_1.RegistroRecarga.find(query).populate('IdUsuario').populate('IdPlan').skip(Number(Desde)).limit(Number(Limite)),
    ]);
    res.json({
        total,
        datos,
    });
});
exports.ObtenerRegistroRecargas = ObtenerRegistroRecargas;
const ObtenerRegistroRecarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registrorecarga = yield models_1.RegistroRecarga.findById(id).populate('IdUsuario').populate('IdPlan').catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
    res.json(registrorecarga);
});
exports.ObtenerRegistroRecarga = ObtenerRegistroRecarga;
const CrearRegistroRecarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { Estado } = _a, body = __rest(_a, ["Estado"]);
    const registrorecarga = new models_1.RegistroRecarga(body);
    try {
        const CntViajesUsu = yield models_1.Usuario.findById(registrorecarga.IdUsuario);
        const CntViajesPlan = yield models_1.Plan.findById(registrorecarga.IdPlan);
        const UsuarioModificado = yield models_1.Usuario.findByIdAndUpdate(registrorecarga.IdUsuario, { CntViajes: CntViajesUsu.CntViajes + CntViajesPlan.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
        const RegistroRecargaNuevo = yield registrorecarga.save();
        res.status(201).json({ RegistroRecargaNuevo, UsuarioModificado });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: 'no es una id correcta' });
    }
});
exports.CrearRegistroRecarga = CrearRegistroRecarga;
const ActualizarRegistroRecarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { Estado } = _b, body = __rest(_b, ["Estado"]);
    const registrorecarga = new models_1.RegistroRecarga(body);
    try {
        const RegistroRecargaActual = yield models_1.RegistroRecarga.findById(id);
        const CntViajesUsuNuevo = yield models_1.Usuario.findById(registrorecarga.IdUsuario).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }); });
        const CntViajesPlanNuevo = yield models_1.Plan.findById(registrorecarga.IdPlan).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }); });
        const UsuarioModificado = yield models_1.Usuario.findByIdAndUpdate(registrorecarga.IdUsuario, { CntViajes: CntViajesUsuNuevo.CntViajes + CntViajesPlanNuevo.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
        //ahora restamos los viejos
        if (RegistroRecargaActual.Estado) {
            const CntViajesUsu = yield models_1.Usuario.findById(RegistroRecargaActual.IdUsuario);
            const CntViajesPlan = yield models_1.Plan.findById(RegistroRecargaActual.IdPlan);
            const UsuarioDesModificado = yield models_1.Usuario.findByIdAndUpdate(RegistroRecargaActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes - CntViajesPlan.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }); });
        }
        const RegistroRecargaModificado = yield models_1.RegistroRecarga.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta2', error: err.message }); });
        res.json({ RegistroRecargaModificado });
    }
    catch (error) {
        res.status(400).json({ status: 'Error', error: error });
    }
});
exports.ActualizarRegistroRecarga = ActualizarRegistroRecarga;
const BorrarRegistroRecarga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const RegistroRecargaActual = yield models_1.RegistroRecarga.findById(id);
    const CntViajesUsu = yield models_1.Usuario.findById(RegistroRecargaActual.IdUsuario);
    const CntViajesPlan = yield models_1.Plan.findById(RegistroRecargaActual.IdPlan);
    const UsuarioDesModificado = yield models_1.Usuario.findByIdAndUpdate(RegistroRecargaActual.IdUsuario, { CntViajes: CntViajesUsu.CntViajes - CntViajesPlan.CntViajes }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta1', error: err }); });
    const RegistroRecargaBorrado = yield models_1.RegistroRecarga.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
    res.json(RegistroRecargaBorrado);
});
exports.BorrarRegistroRecarga = BorrarRegistroRecarga;
