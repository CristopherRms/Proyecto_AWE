import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [HeaderComponent,ProductListComponent,FooterComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

}
