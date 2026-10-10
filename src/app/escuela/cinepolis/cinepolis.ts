
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICinepolis } from '../alumno';

@Component({
  selector: 'app-cinepolis',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis {

  formulario!: FormGroup;

  compraCine: ICinepolis = {
    nombre: '',
    cantidadCompradores: 0,
    tarjeta: false,
    cantidadBoletos: 0
  }

  total: number = 0;
  aviso:string='';

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(0),
      tarjeta: new FormControl(false),
      cantidadBoletos: new FormControl(0),
    });

  }

  calcular(): void {

    this.aviso='';

    this.compraCine.nombre = this.formulario.value.nombre;
    this.compraCine.cantidadCompradores = this.formulario.value.cantidadCompradores;
    this.compraCine.tarjeta = this.formulario.value.tarjeta;
    this.compraCine.cantidadBoletos = this.formulario.value.cantidadBoletos;

    if (this.compraCine.cantidadBoletos > this.compraCine.cantidadCompradores *  7 ) {
      this.aviso = 'No puede comprar mas de 7 boletos por comprador';
      return;
    }


    this.total = this.compraCine.cantidadBoletos * 12;

    if (this.compraCine.cantidadBoletos > 5) {
      this.total = this.total - (this.total * 0.15);
    }
    else if (this.compraCine.cantidadBoletos >= 3) {
      this.total = this.total - (this.total * 0.10);
    }

    if (this.compraCine.tarjeta == true) {
      this.total = this.total - (this.total * 0.10);
    }

  
    

  }

  salir():void{

  this.formulario.reset();
  this.compraCine.nombre='';
  this.total = 0;
  this.aviso = '';

  }

}
