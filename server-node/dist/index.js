"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose = require("mongoose");
// importar para el manejo de cors
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// lo siguiente es para subir archivos a mi servidor
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
// Body parser es para que la data que reciba la prepare en este caso la convierta a json
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// fileUpload es para que nos agregue a nuestro request el file donde recibe los archivos que envie el fontend
server.app.use(express_fileupload_1.default());
// configuracion del cors para que permita peticiones desde otros servidores o puertos
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi aplicacion
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// conectar a base de datos
// busca la base de datos, sino existe la crea
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos online');
});
server.start(() => { console.log('servidor corriendo ' + server.port); });
