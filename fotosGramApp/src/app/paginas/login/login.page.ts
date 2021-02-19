import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // tomar la referencia del slides del html, ya que hay dos slides
  // creo que es como slidePrincipal = document.querySelector('#slidePrincipal');
  @ViewChild('slidePrincipal') slidePrincipal :IonSlides;
  loginUser = {
    email:'josueperezf@gmail.com',
    password: '1234'
  }
  registroUsuario: Usuario = {
    email:    '',
    nombre:   '',
    password: '',
    avatar:   'av-1.png'
  }

  constructor(
    private usuarioService:UsuarioService,
    private navController:NavController,
    private uiServiceService:UiServiceService,
  ) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    // bloquea que el slider se pueda mover, ya que quien movera sera un boton
    this.slidePrincipal.lockSwipes(true);
  }

  async login( form:NgForm ) {
    if(!form.valid) {
      return;
    }
    const respuesta = await this.usuarioService.login(form.value.email, form.value.password);
    if(respuesta) {
      // navegar al tabs
      this.navController.navigateForward('/main/tabs/tab1',{animated:true });
    } else {
      this.uiServiceService.alertaInformativa('Usuario y/o contraseña no son correctos.');
      // notificar datps erroneos
    }
  }
  async registro(form:NgForm) {
    if(!form.valid) {
      return;
    }
    const respuesta = await this.usuarioService.registro(this.registroUsuario);
    if(respuesta) {
      // navegar al tabs
      this.navController.navigateForward('/main/tabs/tab1',{animated:true });
    } else {
      this.uiServiceService.alertaInformativa('Correo electronico ya existe.');
      // notificar datps erroneos
    }
  }

  mostrarRegistro() {
    // desbloquear el sliderprincipal
    this.slidePrincipal.lockSwipes(false);
    // mover al slider
    this.slidePrincipal.slideTo(1);
    // volver a bloquear el slider
    this.slidePrincipal.lockSwipes(true);
  }
  mostrarLogin() {
    // desbloquear el sliderprincipal
    this.slidePrincipal.lockSwipes(false);
    // mover al slider
    this.slidePrincipal.slideTo(0);
    // volver a bloquear el slider
    this.slidePrincipal.lockSwipes(true);
  }
  recibirCambio(img) {
    this.registroUsuario.avatar = img;
  }
}
