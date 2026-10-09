import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IAlumno} from '../alumno'

@Component({
  selector: 'app-lista-escuela',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lista-escuela.html',
  styleUrl: './lista-escuela.css',
})
export class ListaEscuela {
formulario!:FormGroup

nuevoAlumno:IAlumno={
  matricula:'xxx',
  nombre:'xxx',
  correo:'xx',
  materia:'xx'
}

  ngOnInit():void{

      this.formulario=new FormGroup({
        matricula:new FormControl(''),
        nombre:new FormControl(''),
        correo:new FormControl(''),
        materia:new FormControl(''),
      })
      }

  muestraAlumno():void{
    this.nuevoAlumno.matricula=this.formulario.value.matricula
    this.nuevoAlumno.nombre=this.formulario.value.nombre
    this.nuevoAlumno.correo=this.formulario.value.correo
    this.nuevoAlumno.materia=this.formulario.value.materia
  }
   


}
