import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import{ CarritoService }from '../services/carrito.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [NgFor, NgClass, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})export class IndividualComponent implements OnInit {
  product: Product = { _id: '', category: '', tallas: [], images: [], title: '', description: '', price: 0 }; // Inicialización con valores predeterminados
  tallaSeleccionada: string | null = null;
  imagenSeleccionada: string | null = null; // Nueva propiedad para la imagen principal
  public role: string | null = null;
  constructor(
    private productService: ProductService,
    private CarritoService:CarritoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  tallaSelec=false;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProductById(id);
      console.log(id);
    }
    this.role = localStorage.getItem('role');
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.product = response;

        // Establece la primera imagen como seleccionada por defecto
        if (this.product.images.length > 0) {
          this.imagenSeleccionada = this.product.images[0];
        }
      },
      error: (error) => {
        console.error('Error al obtener el producto:', error);
      },
    });
  }

  cambiarImagen(imagen: string): void {
    this.imagenSeleccionada = imagen; // Actualiza la imagen principal
  }

  seleccionarTalla(talla: string): void {
    this.tallaSeleccionada = talla;
    this.tallaSelec=true;
  }


  agregarAlCarrito(): void {
  if (this.role == 'user'){
    if (this.tallaSeleccionada) {
      this.CarritoService.agregarAlCarrito({
        id: this.product._id,
        nombre: this.product.title,
        descripcion: this.product.description,
        precio: this.product.price,
        talla: this.tallaSeleccionada,
        imagen: this.imagenSeleccionada || '',
        cantidad: 1,
      });
      console.log(`Producto agregado: ${this.product.title}`);
      alert(`Producto agregado al Carrito: ${this.product.title}`);
    } else {
      alert('Selecione una Talla');
    }
  } else{
    this.router.navigate(['/login']);
  }
}


  
  
}

