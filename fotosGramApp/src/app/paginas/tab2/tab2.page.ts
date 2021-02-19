import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/servicios/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[] = null;
  cargandoGeolocalizacion:boolean = false;
  post = {
    mensaje:'',
    coords: null,
    posicion:false
  };
  constructor(
    private postsService:PostsService,
    private route:Router,
    private geolocation:Geolocation,
    private camera: Camera
    ) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postsService.crearPost( this.post);
    if(creado) {
      this.post = {
        mensaje:'',
        coords: null,
        posicion:false
      };
      this.tempImages = [];
      this.route.navigateByUrl('/main/tabs/tab1');
    }
  }

  getGeo() {
    if(!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeolocalizacion = true;

    // llamar al geolocalizador
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeolocalizacion = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeolocalizacion = false;
     });
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      // esto podria ser un base64 u otra
      destinationType: this.camera.DestinationType.FILE_URI,
      // formato de la imagen
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // la orientacion es por si se toma la foto horizontal o verticalmente, lo ajuste correctamente
      correctOrientation:true,
      //  definir el origen, ejemplo la camara o el listado de fotos que estan en mi dispositivo
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.procesarImagen(options);
  }

  // este metodo es por si la persona no quiere tomar fotos sino subir una de las existentes en el telefono
  libreria() {
    const options: CameraOptions = {
      quality: 100,
      // esto podria ser un base64 u otra
      destinationType: this.camera.DestinationType.FILE_URI,
      // formato de la imagen
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // la orientacion es por si se toma la foto horizontal o verticalmente, lo ajuste correctamente
      correctOrientation:true,
      //  definir el origen, ejemplo la camara o el listado de fotos que estan en mi dispositivo
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen(options);
  }

  procesarImagen(options:CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postsService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }
}
