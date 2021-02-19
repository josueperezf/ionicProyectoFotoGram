import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/servicios/posts.service';
import { UiServiceService } from 'src/app/servicios/ui-service.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  usuario:Usuario = {};
  constructor(
    private usuarioService:UsuarioService,
    private uiServiceService:UiServiceService,
    private postsService:PostsService
    ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);

  }

  async actualizar(form:NgModel) {
    if(!form.valid) {
      return;
    }
    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    console.log(actualizado);
    if(actualizado) {
      this.uiServiceService.presentToast('Registro Actualizado');
    } else {
      this.uiServiceService.presentToast('No se pudo actualizar');
    }
  }
  logout() {
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }
}
