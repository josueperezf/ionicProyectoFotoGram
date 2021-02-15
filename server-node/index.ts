import Server from "./clases/server";
import mongoose = require("mongoose");
import bodyParser  from 'body-parser';
// lo siguiente es para subir archivos a mi servidor
import fileUpload  from 'express-fileupload';

import userRoutes from "./routes/usuario";
import postRoute from "./routes/post";


const server = new Server();


// Body parser es para que la data que reciba la prepare en este caso la convierta a json
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json() );

// fileUpload es para que nos agregue a nuestro request el file donde recibe los archivos que envie el fontend
server.app.use(fileUpload());


// Rutas de mi aplicacion
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoute);



// conectar a base de datos
// busca la base de datos, sino existe la crea
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    },
    (error)=>{
        if(error) {
            throw error;
        }
        console.log('Base de datos online');
        
     } )

server.start(()=>{console.log('servidor corriendo '+ server.port);});