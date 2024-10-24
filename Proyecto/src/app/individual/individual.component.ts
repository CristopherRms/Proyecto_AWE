import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [NgFor, NgClass, HeaderComponent, FooterComponent],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent {
  producto = {
    nombre: 'Sudadera Urbana',
    descripcion: 'Sudadera con capucha de alta calidad, ideal para un look urbano moderno.',
    precio: 800,
    imagenPrincipal: 'https://via.placeholder.com/500',
    imagenes: [
      'https://via.placeholder.com/150/0000FF/808080',
      'https://via.placeholder.com/150/FF0000/FFFFFF',
      'https://via.placeholder.com/150/00FF00/000000'
    ],
    tallas: ['S', 'M', 'L', 'XL']
  };

  tallaSeleccionada: string | null = null;

  cambiarImagen(imagen: string) {
    this.producto.imagenPrincipal = imagen;
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }
}
