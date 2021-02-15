"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    // fecha de creacion
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    // el siguiente campo esta como array, es por que puede almacenar una coleccion de imagenes, mejor dicho, este campo puede tener dentro muchas imagenes
    // las imagenes va a ser un arreglo de string
    imgs: [
        {
            type: String
        }
    ],
    // coordenadas
    coords: {
        type: String
    },
    //  el siguiente campo es para relacionar la tabla usuario
    // en la tabla post iria un campo llamado usuario, relacionado a la tabla usuario
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe Existir una relacion con un usuario']
    }
});
// la siguiente liena es como un trigger que se dispara antes de guardar en la base de datos
// no debe ser funcion flecha
// next es algo como lo del middleware, es un parametro de que si no se llama no avanza a guardar de verdad en la base de datos
// se esta inicializando la variable para que cada vez que vaya a insertar un post, le coloque la fecha actual
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
// el model ayuda a la iteraccion con la base de datos
exports.Post = mongoose_1.model('Post', postSchema);
