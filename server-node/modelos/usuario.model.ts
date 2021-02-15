import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema:Schema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [ true, 'La clave es necesario']
    },
});

// metodo para comparar si la clave es correcta
// se recomienda funcion y no funcion de flecha, si se usa funcion de flecha, perdemos reflerencia al this
usuarioSchema.method('compararPassword', function(password:string): boolean{
    const instancia:any = this;
    if(bcrypt.compareSync(password, instancia.password) ){
        return true;
    } else {
        return false;
    }
});

export interface IUsuario extends Document{
    nombre:     string;
    avatar:     string;
    email:      string;
    password:   string;

    compararPassword(password:string): boolean;
}

// el model ayuda a la iteraccion con la base de datos
export const Usuario = model<IUsuario>('Usuario',usuarioSchema);