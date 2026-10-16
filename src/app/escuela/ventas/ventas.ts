import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICinepolis } from '../alumno';

interface IVenta extends ICinepolis {
  total: number;
}

@Component({
  selector: 'app-ventas',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas implements OnInit {
  formulario!: FormGroup;
  ventas: IVenta[] = [];
  indiceEdicion: number = -1;

  compraCine: ICinepolis = {
    nombre: '',
    cantidadCompradores: 0,
    tarjeta: false,
    cantidadBoletos: 0,
  };

  total: number = 0;
  aviso: string = '';

  ngOnInit(): void {
    this.cargarVentas();
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(0),
      tarjeta: new FormControl(false),
      cantidadBoletos: new FormControl(0),
    });
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventasCinepolis');

    if (datos) {
      this.ventas = JSON.parse(datos);
    } else {
      this.ventas = [];
    }
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
    } else if (this.compraCine.cantidadBoletos >= 3) {
      this.total = this.total - (this.total * 0.10);
    }

    if (this.compraCine.tarjeta == true) {
      this.total = this.total - (this.total * 0.10);
    }

    this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;

    // Actualiza el registro editado
    if (this.indiceEdicion !== -1) {
      this.ventas[this.indiceEdicion] = {
        ...this.compraCine,
        total: this.total,
      };

      localStorage.setItem('ventasCinepolis', JSON.stringify(this.ventas));
      this.cancelarEdicion();
    }
  }

  editarVenta(index: number): void {
    this.indiceEdicion = index;
    const venta = this.ventas[index];

    this.compraCine = { ...venta };

    this.formulario.patchValue({
      nombre: venta.nombre,
      cantidadCompradores: venta.cantidadCompradores,
      tarjeta: venta.tarjeta,
      cantidadBoletos: venta.cantidadBoletos,
    });

    this.total = venta.total;
    this.aviso = '';
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventasCinepolis', JSON.stringify(this.ventas));

    if (this.indiceEdicion === index) {
      this.cancelarEdicion();
    }
  }

  cancelarEdicion(): void {
    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 0,
      tarjeta: false,
      cantidadBoletos: 0,
    });

    this.compraCine = {
      nombre: '',
      cantidadCompradores: 0,
      tarjeta: false,
      cantidadBoletos: 0,
    };

    this.total = 0;
    this.aviso = '';
    this.indiceEdicion = -1;
  }
}