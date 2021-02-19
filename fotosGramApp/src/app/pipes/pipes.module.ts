import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [DomSanitizerPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports:[
    DomSanitizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
