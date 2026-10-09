import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cinepolis',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis {
formulario!:FormGroup

  ngOnInit():void{

      this.formulario=new FormGroup({
        nombre:new FormControl(''),
        cantidadCompradores:new FormControl(''),
        correo:new FormControl(''),
        materia:new FormControl(''),
      })
      }

}
