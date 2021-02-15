"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// fs: eso es para  el menajo de archivos, crear carpetas y ver si existen archivos en carpetas etc
const fs_1 = __importDefault(require("fs"));
// 
const uniqid_1 = __importDefault(require("uniqid"));
// eso es para tonar la imagen que viene del frontend, en la ruta temporal que envia el directorio, y guardar la imagen en la carpeta que queremos
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userId) {
        // userId es porque la carpeta tiene como nombre el id del usuario en la base de datos
        // promesa la crea fernando ya el metodo mv no es promesa, la unica forma seria callback y no seria lo mas correcto
        return new Promise((resolve, reject) => {
            // lugar donde quiero almacenar la imagen
            const path = this.crearCarpetaUsuario(userId);
            const nombreArchivo = this.generarNombreUnico(file.name);
            // mover el archivo de donde lo almacena por default node, a la ruta temporal que nosotros queremos
            file.mv(`${path}/${nombreArchivo}`, (error) => {
                if (error) {
                    // no se pudo mover la imagen retornamos error
                    reject(error);
                }
                else {
                    // todo salio bien
                    resolve();
                }
            });
        });
    }
    crearCarpetaUsuario(userId) {
        // se crea dos carpeta, una temporal y una definitiva, la temporal es cuando esta subiendo las cosas, la definitiva es cuando ya se guardo
        // esto creara el contenido en la carpeta dist que es la que se debe subir al servidor,
        // la carpeta uploads que esta fuera de la carpeta dist, es para que el compilador maneje automaticamente los archivos en dist,es obligatorio que exista
        const pathUsuario = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUsuarioTemp = pathUsuario + '/temp';
        // console.log(pathUsuario);
        const existe = fs_1.default.existsSync(pathUsuario);
        if (!existe) {
            fs_1.default.mkdirSync(pathUsuario);
            fs_1.default.mkdirSync(pathUsuarioTemp);
        }
        return pathUsuarioTemp;
    }
    generarNombreUnico(nombreOriginal) {
        //obtener la extension origial
        const nombreArray = nombreOriginal.split('.');
        const extension = nombreArray[nombreArray.length - 1];
        // uniqid genera id aleatorio, tipo random 
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    // para mover las imagenes de la carpeta temp que creamos nosotros, hacia la post
    imagenesDeTempHaciaPost(userId) {
        console.log('en el metodo: imagenesDeTempHaciaPost');
        // path de la carpeta temporal
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        // path de la carpeta posts
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        console.log({ pathTemp, pathPost });
        // validar si existe carpeta
        if (!fs_1.default.existsSync(pathTemp)) {
            console.log('entro en el no existe');
            return [];
        }
        console.log('no entro en el no existe');
        // validar si existe la carpeta posts, sino existe, cree la carpeta
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        // movemos las imagenes
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        console.log(pathTemp);
        // leer el directorio, retorna un array con los nombres de las imagenes que existen en ese directorio, sino existe, retorna un array vacio
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        // crear el path de los post
        // verificar si la imagen existe
        // userId es porque la carpeta tiene como nombre el id del usuario en la base de datos
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        if (!fs_1.default.existsSync(pathFoto)) {
            return path_1.default.resolve(__dirname, '../assets/', 'imagenes', '400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
