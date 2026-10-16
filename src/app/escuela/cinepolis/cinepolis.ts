
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICinepolis } from '../alumno';

@Component({
  selector: 'app-cinepolis',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
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
  };

  total: number = 0;
  aviso: string = '';

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(0),
      tarjeta: new FormControl(false),
      cantidadBoletos: new FormControl(0),
    });

  }

  calcular(): void {

    this.total = 0;
    this.aviso = '';

    this.compraCine.nombre = this.formulario.value.nombre || '';
    this.compraCine.cantidadCompradores = Number(this.formulario.value.cantidadCompradores);
    this.compraCine.tarjeta = this.formulario.value.tarjeta === true;
    this.compraCine.cantidadBoletos = Number(this.formulario.value.cantidadBoletos);

    if (
      this.compraCine.nombre.trim() === '' ||
      !Number.isInteger(this.compraCine.cantidadCompradores) ||
      this.compraCine.cantidadCompradores < 1 ||
      !Number.isInteger(this.compraCine.cantidadBoletos) ||
      this.compraCine.cantidadBoletos < 1
    ) {
      this.aviso = 'Completa todos los campos correctamente';
      return;
    }

    if (this.compraCine.cantidadBoletos > this.compraCine.cantidadCompradores * 7) {
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

    this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;

    
    const datos = localStorage.getItem('ventasCinepolis');

    const ventas: (ICinepolis & { total: number })[] =
      datos ? JSON.parse(datos) : [];

    
    ventas.push({
      ...this.compraCine,
      total: this.total
    });

    
    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(ventas)
    );

  }

  cargarCompras(): void {

    const datos = localStorage.getItem('ventasCinepolis');

    if (datos) {

      const ventas: (ICinepolis & { total: number })[] = JSON.parse(datos);

      if (ventas.length > 0) {

        const ultima = ventas[ventas.length - 1];

        this.compraCine = {
          nombre: ultima.nombre,
          cantidadCompradores: ultima.cantidadCompradores,
          tarjeta: ultima.tarjeta,
          cantidadBoletos: ultima.cantidadBoletos
        };

        this.total = ultima.total;
        this.formulario.patchValue(this.compraCine);
        this.aviso = '';

      } else {
        this.aviso = 'No hay ventas guardadas';
      }

    } else {
      this.aviso = 'No hay ventas guardadas';
    }

  }

  salir(): void {

    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 0,
      tarjeta: false,
      cantidadBoletos: 0
    });

    this.compraCine.nombre = '';
    this.total = 0;
    this.aviso = '';

  }

}
