import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarCambio = new EventEmitter<string>();
  @Input() seleccionado: string = '';
  optionsSliderAvatar = {
    slidesPerView : 3.5,
  }
  avatars = [
      {
        img: 'av-1.png',
        seleccionado: true
      },
      {
        img: 'av-2.png',
        seleccionado: false
      },
      {
        img: 'av-3.png',
        seleccionado: false
      },
      {
        img: 'av-4.png',
        seleccionado: false
      },
      {
        img: 'av-5.png',
        seleccionado: false
      },
      {
        img: 'av-6.png',
        seleccionado: false
      },
      {
        img: 'av-7.png',
        seleccionado: false
      },
      {
        img: 'av-8.png',
        seleccionado: false
      },
  ];
  constructor() { }

  ngOnInit() {
    if(this.seleccionado) {
      this.avatars.forEach((element:any) => {
        if(this.seleccionado == element.img) {
          element.seleccionado = true;
        } else {
          element.seleccionado = false;
        }
      });
    }
  }

  seleccionarAvatar(avatar){
    /*
    / opcion josue
    this.avatars.forEach(element => {
      if(element.img == avatar.img) {
        element.seleccionado = true;
      } else {
        element.seleccionado = false;
      }
    });
    */
   // opcion fernando
   this.avatars.forEach(element => element.seleccionado = false);
   // la siguiente linea modifica el arreglo de avatar por que llega la referencia al objeto
   avatar.seleccionado = true;
   this.avatarCambio.emit(avatar.img);
  }
}
