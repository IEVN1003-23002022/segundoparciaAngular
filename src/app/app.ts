import { Component, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Zodiaco } from './formulario/zodiaco/zodiaco';
import {Navbar} from './navbar/navbar'
import {Distancia} from './formulario/distancia/distancia'
import { RouterOutlet } from '@angular/router';
 

@Component({
  selector: 'app-root',
  imports: [Zodiaco, Navbar, RouterOutlet, Distancia],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('segundoparcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }

}