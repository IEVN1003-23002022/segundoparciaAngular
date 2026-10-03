import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})
export class Zodiaco {

  nombre: string = '';
  aPaterno: string = '';
  aMaterno: string = '';
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = ''
  edad: number = 0;
  signoNumero: number = -1;
  signoNombre: string = '';
  signoImagen: string = '';


calcularEdad() {

  this.edad = 2026 - this.anio;

  if (this.mes > 10) {
    this.edad = this.edad - 1;
  }
  else {
    this.edad = this.edad;
  }

  if (this.mes == 10) {

    if (this.dia > 3) {
      this.edad = this.edad - 1;
    }
    else {
      this.edad = this.edad;
    }

  }

  return this.edad;
}


  imprimir() {

    this.calcularEdad();
    this.signoNumero = (this.anio - 4) % 12;

    if (this.signoNumero < 0) {
      this.signoNumero = this.signoNumero + 12;
    }

    this.nombre
    this.aPaterno
    this.aMaterno

    for (let i = 0; i < 12; i++) {


      let signosZodiacales = [
        {
          nombre: 'Rata',
          imagen: 'https://www.karmaweather.com/file/2020/04/01-rat-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Buey',
          imagen: 'https://www.karmaweather.com/file/2020/04/02-ox-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Tigre',
          imagen: 'https://www.karmaweather.com/file/2020/04/03-tiger-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Conejo',
          imagen: 'https://www.karmaweather.com/file/2020/04/04-rabbit-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Dragón',
          imagen: 'https://www.karmaweather.com/file/2020/04/05-dragon-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Serpiente',
          imagen: 'https://www.karmaweather.com/file/2020/04/06-snake-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Caballo',
          imagen: 'https://www.karmaweather.com/file/2020/04/07-horse-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Cabra',
          imagen: 'https://www.karmaweather.com/file/2020/04/08-goat-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Mono',
          imagen: 'https://www.karmaweather.com/file/2020/04/09-monkey-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Gallo',
          imagen: 'https://www.karmaweather.com/file/2020/04/10-rooster-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Perro',
          imagen: 'https://www.karmaweather.com/file/2020/04/11-dog-chinese-horoscope-karmaweather-konbi.jpg'
        },
        {
          nombre: 'Cerdo',
          imagen: 'https://www.karmaweather.com/file/2020/04/12-pig-chinese-horoscope-karmaweather-konbi.jpg'
        }
      ];


      if (i == this.signoNumero) {
        this.signoNombre = signosZodiacales[i].nombre;
        this.signoImagen = signosZodiacales[i].imagen;

        break;
      }

    }

  }

}