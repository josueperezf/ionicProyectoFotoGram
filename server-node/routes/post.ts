import { Response, Request, Router } from "express";
import FileSystem from "../clases/file-system";
import { FileUpload } from "../interfaces/file-upload";
import { verificarToken } from "../middlewares/autenticacion";
import { Post } from "../modelos/post.model";

const postRoute =  Router();
const fileSystem = new FileSystem();
// Obtener POST paginados
postRoute.get('/', async (request:any, response: Response)=>{
    const numeroDeRegistrosMostrar = 10;
    // para tomar parametro en la url, 'parametro ?pagina=xx ' tipo opcionales se hace asi:
    let pagina = Number(request.query.pagina) || 1;

    // es para que si estoy en la pagina 2, con limit de 10, entonces el saltar me de desde que numero me dara los registros, ejemplo desde la 20 hasta la pagina 30, es de recordar que se empieza desde la posicion 0
    let saltar = pagina -1;
    saltar = saltar * numeroDeRegistrosMostrar;


    // -1 es para descendiente, 1 es para ascendiente
    // el populate es para traer infomracion de tablas relacionale por asi decirlo, el -password, es para que traiga todos los campos menos el passord
    const posts = await Post.find()
                            .sort({'_id':-1 })
                            .skip(saltar)
                            .populate('usuario', ['-password'])
                            .limit(numeroDeRegistrosMostrar)
                            .exec();
    response.json({
        ok:true,
        pagina,
        posts
    });
});




// crear Post
postRoute.post('/', [verificarToken], (request:any, response: Response)=>{
    const body = request.body;
    // el _id es porque asi lo llama mongodb
    body.usuario = request.usuario._id;
    // las imagenes se les genera un nombre y luego ese nombre se debe guardar en la base de datos para ello:
    const imagenes = fileSystem.imagenesDeTempHaciaPost(body.usuario);
    body.imgs = imagenes;

    Post.create(body).then(async(postDb)=>{
        // para retornar o darle al frontend los datos de la persona relacionada al post, se usa:
        // para decirle que del usuario no me traiga la contraseña, se usa el -nombreDelCampo
        await postDb.populate('usuario', '-password').execPopulate();
        response.json({
            ok:true,
            post:postDb,
        });
    }).catch((error)=>{
        console.log(error);
    });
});


// Servicio para subir archivos
postRoute.post('/upload',[verificarToken], async (request:any , response :Response)=>{
    if(! request.files ) {
        return response.status(400).json({
            ok: false,
            mensaje:'No se subio ningun archivo'
        });
    }
    const file:FileUpload = request.files.img;
    if(!file) {
        return response.status(400).json({
            ok: false,
            mensaje:'No se subio ningun archivo - image'
        });
    }
    // si no es imagen no salga
    if(!file.mimetype.includes('image') ) {
        return response.status(400).json({
            ok: false,
            mensaje:'Lo que subio no es imagen'
        });
    }
    // crear las carpetas donde ira almacenada las imagenes
    await fileSystem.guardarImagenTemporal(file, request.usuario._id);

    // responder al frontend
    response.json({
        ok: true,
        file:file.mimetype
    });
});

// mostarImagen
postRoute.get('/imagen/:userId/:img', (request:Request, response:Response)=>{
    const userId    = request.params.userId;
    const img       = request.params.img;
    const pathFoto  = fileSystem.getFotoUrl(userId, img);
    response.sendFile(pathFoto);
});

export default postRoute;