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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_system_1 = __importDefault(require("../clases/file-system"));
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../modelos/post.model");
const postRoute = express_1.Router();
const fileSystem = new file_system_1.default();
// Obtener POST paginados
postRoute.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const numeroDeRegistrosMostrar = 10;
    // para tomar parametro en la url, 'parametro ?pagina=xx ' tipo opcionales se hace asi:
    let pagina = Number(request.query.pagina) || 1;
    // es para que si estoy en la pagina 2, con limit de 10, entonces el saltar me de desde que numero me dara los registros, ejemplo desde la 20 hasta la pagina 30, es de recordar que se empieza desde la posicion 0
    let saltar = pagina - 1;
    saltar = saltar * numeroDeRegistrosMostrar;
    // -1 es para descendiente, 1 es para ascendiente
    // el populate es para traer infomracion de tablas relacionale por asi decirlo, el -password, es para que traiga todos los campos menos el passord
    const posts = yield post_model_1.Post.find()
        .sort({ '_id': -1 })
        .skip(saltar)
        .populate('usuario', ['-password'])
        .limit(numeroDeRegistrosMostrar)
        .exec();
    response.json({
        ok: true,
        pagina,
        posts
    });
}));
// crear Post
postRoute.post('/', [autenticacion_1.verificarToken], (request, response) => {
    const body = request.body;
    // el _id es porque asi lo llama mongodb
    body.usuario = request.usuario._id;
    // las imagenes se les genera un nombre y luego ese nombre se debe guardar en la base de datos para ello:
    const imagenes = fileSystem.imagenesDeTempHaciaPost(body.usuario);
    body.imgs = imagenes;
    post_model_1.Post.create(body).then((postDb) => __awaiter(void 0, void 0, void 0, function* () {
        // para retornar o darle al frontend los datos de la persona relacionada al post, se usa:
        // para decirle que del usuario no me traiga la contraseña, se usa el -nombreDelCampo
        yield postDb.populate('usuario', '-password').execPopulate();
        response.json({
            ok: true,
            post: postDb,
        });
    })).catch((error) => {
        console.log(error);
    });
});
// Servicio para subir archivos
postRoute.post('/upload', [autenticacion_1.verificarToken], (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.files) {
        return response.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = request.files.img;
    if (!file) {
        return response.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo - image'
        });
    }
    // si no es imagen no salga
    if (!file.mimetype.includes('image')) {
        return response.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es imagen'
        });
    }
    // crear las carpetas donde ira almacenada las imagenes
    yield fileSystem.guardarImagenTemporal(file, request.usuario._id);
    // responder al frontend
    response.json({
        ok: true,
        file: file.mimetype
    });
}));
// mostarImagen
postRoute.get('/imagen/:userId/:img', (request, response) => {
    const userId = request.params.userId;
    const img = request.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    response.sendFile(pathFoto);
});
exports.default = postRoute;
