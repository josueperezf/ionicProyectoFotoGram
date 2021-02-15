import { request, Request, Response, Router } from "express";
import { IUsuario, Usuario } from "../modelos/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../clases/token";
import { verificarToken } from "../middlewares/autenticacion";

const userRoutes = Router();

// Login
userRoutes.post('/login', (request:Request, response:Response)=>{
    const body = request.body;
    Usuario.findOne({email:body.email},(error:any, userDB:IUsuario )=>{
        if (error) throw error;
        if(!userDB){
            return response.json({ok:false, mensaje:'Usuario/contraseña no son correctas'});
        }
        if(userDB.compararPassword(body.password) ) {
            // _id es el id que genera la base datos cada vez que hace una insercion
            const tokenUsuario = Token.getJwtToken({
                _id:    userDB._id,
                nombre: userDB.nombre,
                email:  userDB.email,
                avatar: userDB.avatar,
            });
             response.json({
                ok: true,
                token: tokenUsuario,
                mensaje: 'Operacion Exitosa'

            });
        } else {
            return response.json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrecta ***'
            });
        }
    })
});


userRoutes.post('/create', (req:Request , response:Response )=>{
    // obtengo la informacion que me enviaron por post
    const user = {
        nombre:     req.body.nombre,
        avatar:     req.body.avatar,
        email:      req.body.email,
        password:   bcrypt.hashSync(req.body.password, 10),
    };
    
    // guardo en base de datos
    Usuario.create(user).then( userDB =>{
        const tokenUsuario = Token.getJwtToken({
            _id:    userDB._id,
            nombre: userDB.nombre,
            email:  userDB.email,
            avatar: userDB.avatar,
        });
         response.json({
            ok: true,
            token: tokenUsuario,
            mensaje: 'Operacion Exitosa'

        });
    } ).catch((error)=>{
        response.json({
            ok:false,
            user: error
        });
    });

});

// actualizar usuario
userRoutes.post('/update', verificarToken,  (request:any, response:Response)=>{
    const user = {
        nombre:     request.body.nombre || request.usuario.nombre,
        avatar:     request.body.avatar || request.usuario.avatar,
        email:      request.body.email  || request.usuario.email,
        // password:   bcrypt.hashSync(request.body.password, 10),
    };
    // el {new:true} es para decirle que luego de guardar en la base de datos, me retorne la data como quedo en la base de datos
    console.log('id: ',request.usuario._id);
    
    Usuario.findByIdAndUpdate(request.usuario._id, user,{new:true},(error, userDB)=>{
        console.log('entro al find');
        
        if(error) {
            throw error;
        }
        if(!userDB){
            return response.json({
                ok:false,
                mensaje: "No existe usuario con ese id"
            });
        }
        // si la persona cambio algo en su cuenta se debe generar un nuevo token
        const tokenUsuario = Token.getJwtToken({
            _id:    userDB._id,
            nombre: userDB.nombre,
            email:  userDB.email,
            avatar: userDB.avatar,
        });
         return response.json({
            ok: true,
            token: tokenUsuario,
            mensaje: 'Operacion Exitosa'

        });
        
    } );
});

userRoutes.get('/',[verificarToken], (request: any, response:Response)=>{
    const usuario = request.usuario;
    response.json({
        usuario
    });
});

export default userRoutes;