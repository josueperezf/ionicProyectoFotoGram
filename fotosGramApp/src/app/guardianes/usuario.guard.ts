import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {
  constructor( private usuarioService:UsuarioService ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    return this.usuarioService.validaToken();
  }
}
