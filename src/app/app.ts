import { Component, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Zodiaco } from './formulario/zodiaco/zodiaco';

@Component({
  selector: 'app-root',
  imports: [Zodiaco],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('segundoparcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }

}