import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor, NgIf],
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

  eliminarProducto(id: string, talla: string): void {
    this.carritoService.eliminarProducto(id, talla);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }
  mensajeCompraVisible = false;
  comprarCarrito(): void {
    this.carritoService.vaciarCarrito();
    // Muestra el mensaje de agradecimiento
    this.mensajeCompraVisible = true;

    // Oculta el mensaje después de 5 segundos
    setTimeout(() => {
      this.mensajeCompraVisible = false;
    }, 5000);

    this.carrito = [];
  }
}

