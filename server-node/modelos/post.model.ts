import { Schema, Document, model } from "mongoose";

const postSchema = new Schema({
    // fecha de creacion
    created:{
        type: Date
    },
    mensaje:{
        type: String
    },
    // el siguiente campo esta como array, es por que puede almacenar una coleccion de imagenes, mejor dicho, este campo puede tener dentro muchas imagenes
    // las imagenes va a ser un arreglo de string
    imgs: [
        {
            type:String
        }
    ],
    // coordenadas
    coords:{
        type: String
    },
    //  el siguiente campo es para relacionar la tabla usuario
    // en la tabla post iria un campo llamado usuario, relacionado a la tabla usuario
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe Existir una relacion con un usuario']
        
    }
});

// la siguiente liena es como un trigger que se dispara antes de guardar en la base de datos
// no debe ser funcion flecha
// next es algo como lo del middleware, es un parametro de que si no se llama no avanza a guardar de verdad en la base de datos
// se esta inicializando la variable para que cada vez que vaya a insertar un post, le coloque la fecha actual
postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();
});

export interface IPost extends Document{
    created:    Date,
    mensaje:   String,
    img:        String[],
    coords:     String,
    usuario:    String
}

// el model ayuda a la iteraccion con la base de datos
export const Post = model <IPost>('Post',postSchema);