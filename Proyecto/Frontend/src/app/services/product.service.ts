import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uAPI: string = "http://localhost:8080/api/products"; // Cambiar la URL para conectarse al localhost
  private _products: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token o null si no está presente
  }
  // Método para obtener todos los productos
  getProductos(): Observable<any> {
    return this.httpClient.get(this.uAPI);
  }
  getCatProductos(categoria: string): Observable<any> {
    return this.httpClient.get(`${this.uAPI}/category/${categoria}`);
  }
  // Método para obtener un producto por su ID
  getProductById(id: string): Observable<any> {
    console.log(id);
    return this.httpClient.get(`${this.uAPI}/${id}`);
  }

  // Método para agregar un nuevo producto
  addProducto(product: Product){
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }
    console.log(product);
    this.httpClient.post<Product>(this.uAPI, product, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Product created:", response);
        alert('Prudcto agregado');
        this._products.push(response);
      },
      error: (error) => {
        console.log("Error creating Product:", error);
      }
    });
  }

  deleteProduct(id: string): void {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }

    this.httpClient.delete(`${this.uAPI}/${id}`, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: () => {
        console.log("Product deleted:", id);
        this._products = this._products.filter(product => product._id !== id);
      },
      error: (error) => {
        console.log("Error deleting product:", error);
      }
    });
  }
  

  updateProduct(productId: string, productData: any){
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return;
    }
    this.httpClient.put(`${this.uAPI}/${productId}`, productData,{
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    }).subscribe({
      next: (response) => {
        console.log("Product updated:", response);
        alert('Producto actualizado');
  
      },
      error: (error) => {
        console.log("Error updating product:", error);
      }
    });
  }
}
