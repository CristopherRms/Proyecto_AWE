import { Injectable } from '@angular/core';
interface CarritoItem {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    talla: string;
    cantidad: number;
    imagen: string;
}
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
    private carrito: CarritoItem[] = [];
    getCarrito() {
        return this.carrito;
    }

    agregarAlCarrito(item: CarritoItem): void {
        console.log(item);
      const itemExistente = this.carrito.find(
        (i) => i.id === item.id && i.talla === item.talla
      );
  
      if (itemExistente) {
        itemExistente.cantidad += 1;
      } else {
        this.carrito.push({ ...item, cantidad: 1 });
      }
    }
  
    obtenerCarrito(): CarritoItem[] {
      return this.carrito;
    }
  
    vaciarCarrito(): void {
      this.carrito = [];
    }
  
    eliminarProducto(id: string, talla: string): void {
      this.carrito = this.carrito.filter(
        (item) => !(item.id === id && item.talla === talla)
      );
    }
  }
