import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { FooterComponent } from '../footer/footer.component';
import { OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [HeaderComponent,ProductListComponent,FooterComponent,RouterLink, NgIf],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  products: Product[] = [];
  category: string = '';
  public role: string | null = null;
  constructor(private ProductoService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    const cat = this.route.snapshot.paramMap.get('cat');
    if (cat) {
      this.getProducts(cat);
      console.log(cat);
    }
    this.role = localStorage.getItem('role');
  }

  getProducts(cat:string): void {
    console.log(cat);
    this.ProductoService.getCatProductos(cat).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response;
      },
      error: (error) => {
        // Manejo de errores
      },
    });
  }
}