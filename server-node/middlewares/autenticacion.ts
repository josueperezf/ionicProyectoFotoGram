import { NextFunction, Request, Response } from "express";
import Token from "../clases/token";
import { IUsuario } from "../modelos/usuario.model";


// este middleware no solo sirve de middeware, sino tambien ruta a la que este llamando, le va a agregar la informacion de la persona dueña del token 

export const verificarToken = (request:any , response:Response, next: NextFunction) => {
    // la siguiente linea es para obtener los parametros enviados por cabecera
    const userToken =  request.get('x-token') || '';
    Token.comprobarToken(userToken).then((respuesta:any)=>{
        console.log('token respuesta', respuesta);
        request.usuario = respuesta.usuario;
        next();
    })
    .catch((error)=>{
        response.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};