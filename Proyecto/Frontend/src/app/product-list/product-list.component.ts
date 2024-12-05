import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private ProductoService:ProductService){
}
ngOnInit(): void {
  this.role = localStorage.getItem('role');
  this.getProducts();
}
public role: string | null = null;
productList:Product[]=[];
getProducts(){
  this.ProductoService.getProductos().subscribe({
    next: (response) => {
      console.log(response);
      this.productList=response;
    },
    error: (error) => {
      console.log(error);
    },

  })
}
public selectedProduct: any = null;

  showDetails(product: any) {
    this.selectedProduct = product;
  }
}
