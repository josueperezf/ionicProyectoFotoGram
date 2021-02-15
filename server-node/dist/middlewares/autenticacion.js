"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
// este middleware no solo sirve de middeware, sino tambien ruta a la que este llamando, le va a agregar la informacion de la persona dueña del token 
const verificarToken = (request, response, next) => {
    // la siguiente linea es para obtener los parametros enviados por cabecera
    const userToken = request.get('x-token') || '';
    token_1.default.comprobarToken(userToken).then((respuesta) => {
        console.log('token respuesta', respuesta);
        request.usuario = respuesta.usuario;
        next();
    })
        .catch((error) => {
        response.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificarToken = verificarToken;
