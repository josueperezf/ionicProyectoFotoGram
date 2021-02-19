import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();
  constructor(
    private httpClient:HttpClient,
    private usuarioService:UsuarioService,
    private fileTransfer: FileTransfer,
      ) { }

  getPosts( pull: boolean = false ) {
    if ( pull ) {
      this.paginaPosts = 0;
    }
    this.paginaPosts ++;
    return this.httpClient.get<RespuestaPosts>(`${ URL }/posts/?pagina=${ this.paginaPosts }`);

  }

  crearPost(post) {
    return new Promise((resolve)=>{
      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });
      this.httpClient.post(`${URL}/posts`, post,{headers}).subscribe((respuesta)=>{
        if ( respuesta['ok'] ) {
          this.nuevoPost.emit(respuesta['post']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // este metodo sirve para subir cualquier archivo que tenga un path
  subirImagen(archivo:string) {
    // fileKey:'image' es porque el servidor espera un archivo con ese nombre
    const options:FileUploadOptions = {
      fileKey:'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };
    // en la siguiente linea podemos saber que porsentaje lleva cargada la imagen y demas
    const fileTransfer:FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(archivo, `${URL}/posts/upload`, options).then((data)=>{
      console.log({data});
    }).catch((error)=>{
      console.log({error});
    });
  }
}
