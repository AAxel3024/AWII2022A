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
exports.BorrarBus = exports.ActualizarBus = exports.CrearBus = exports.ObtenerBus = exports.ObtenerBuses = void 0;
const models_1 = require("../models");
const ObtenerBuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Limite = 10, Desde = 0 } = req.query;
    const query = { Estado: true };
    const [total, datos] = yield Promise.all([
        models_1.Bus.countDocuments(query),
        models_1.Bus.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);
    res.json({
        total,
        datos,
    });
});
exports.ObtenerBuses = ObtenerBuses;
const ObtenerBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bus = yield models_1.Bus.findById(id).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
    res.json(bus);
});
exports.ObtenerBus = ObtenerBus;
const CrearBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { Estado } = _a, body = __rest(_a, ["Estado"]);
    const BusExiste = yield models_1.Bus.findOne({
        Placa: body.Placa
    });
    if (BusExiste) {
        return res.status(400).json({
            message: `El Bus con esa Placa ya existe ${BusExiste.Placa}`
        });
    }
    const bus = new models_1.Bus(body);
    const BusNuevo = yield bus.save();
    res.status(201).json(BusNuevo);
});
exports.CrearBus = CrearBus;
const ActualizarBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { Estado } = _b, body = __rest(_b, ["Estado"]);
    const BusModificado = yield models_1.Bus.findByIdAndUpdate(id, body, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
    res.json(BusModificado);
});
exports.ActualizarBus = ActualizarBus;
const BorrarBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const BusBorrado = yield models_1.Bus.findByIdAndUpdate(id, { Estado: false }, { new: true }).catch((err) => { res.status(400).json({ status: 'no es una id correcta', error: err }); });
    res.json(BusBorrado);
});
exports.BorrarBus = BorrarBus;
