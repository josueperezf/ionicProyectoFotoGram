"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../modelos/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
// Login
userRoutes.post('/login', (request, response) => {
    const body = request.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (error, userDB) => {
        if (error)
            throw error;
        if (!userDB) {
            return response.json({ ok: false, mensaje: 'Usuario/contraseña no son correctas' });
        }
        if (userDB.compararPassword(body.password)) {
            // _id es el id que genera la base datos cada vez que hace una insercion
            const tokenUsuario = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
            });
            response.json({
                ok: true,
                token: tokenUsuario,
                mensaje: 'Operacion Exitosa'
            });
        }
        else {
            return response.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecta ***'
            });
        }
    });
});
userRoutes.post('/create', (req, response) => {
    // obtengo la informacion que me enviaron por post
    const user = {
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
    };
    // guardo en base de datos
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUsuario = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
        });
        response.json({
            ok: true,
            token: tokenUsuario,
            mensaje: 'Operacion Exitosa'
        });
    }).catch((error) => {
        response.json({
            ok: false,
            user: error
        });
    });
});
// actualizar usuario
userRoutes.post('/update', autenticacion_1.verificarToken, (request, response) => {
    const user = {
        nombre: request.body.nombre || request.usuario.nombre,
        avatar: request.body.avatar || request.usuario.avatar,
        email: request.body.email || request.usuario.email,
    };
    // el {new:true} es para decirle que luego de guardar en la base de datos, me retorne la data como quedo en la base de datos
    console.log('id: ', request.usuario._id);
    usuario_model_1.Usuario.findByIdAndUpdate(request.usuario._id, user, { new: true }, (error, userDB) => {
        console.log('entro al find');
        if (error) {
            throw error;
        }
        if (!userDB) {
            return response.json({
                ok: false,
                mensaje: "No existe usuario con ese id"
            });
        }
        // si la persona cambio algo en su cuenta se debe generar un nuevo token
        const tokenUsuario = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
        });
        return response.json({
            ok: true,
            token: tokenUsuario,
            mensaje: 'Operacion Exitosa'
        });
    });
});
userRoutes.get('/', [autenticacion_1.verificarToken], (request, response) => {
    const usuario = request.usuario;
    response.json({
        usuario
    });
});
exports.default = userRoutes;
