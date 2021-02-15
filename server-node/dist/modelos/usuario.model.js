"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La clave es necesario']
    },
});
// metodo para comparar si la clave es correcta
// se recomienda funcion y no funcion de flecha, si se usa funcion de flecha, perdemos reflerencia al this
usuarioSchema.method('compararPassword', function (password) {
    const instancia = this;
    if (bcrypt_1.default.compareSync(password, instancia.password)) {
        return true;
    }
    else {
        return false;
    }
});
// el model ayuda a la iteraccion con la base de datos
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
