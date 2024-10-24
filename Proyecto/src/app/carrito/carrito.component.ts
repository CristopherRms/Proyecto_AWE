import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor,HeaderComponent,FooterComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = [
    {
      nombre: 'Camiseta Urbana',
      descripcion: 'Camiseta negra con diseño moderno.',
      precio: 500,
      cantidad: 2,
      imagen: 'https://via.placeholder.com/150'
    },
    {
      nombre: 'Gorra Roja',
      descripcion: 'Gorra ajustable estilo urbano.',
      precio: 250,
      cantidad: 1,
      imagen: 'https://via.placeholder.com/150'
    }
  ];

  getTotal() {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }
}
