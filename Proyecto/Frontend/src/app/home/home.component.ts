import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Input } from '@angular/core';
import { ReviewsComponent } from '../reviews/reviews.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent,FooterComponent,HeaderComponent,ProductListComponent, ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slides: any[]=[
    {
      url:"https://i.postimg.cc/vHkd7Msy/DALL-E-2024-11-18-13-27-40-A-modern-slide-design-for-a-clothing-store-using-a-red-black-and-whit.webp",
      title:'Second Slide',
      decription:'two'
    },
    {
      url:"https://i.postimg.cc/YCG02x1x/DALL-E-2024-11-18-13-48-23-A-vibrant-slide-design-for-a-clothing-store-with-a-red-black-and-whit.webp",
      title:'First Slide',
      decription:'One'
    },
    {
      url:"https://i.postimg.cc/GtfR6ZSn/DALL-E-2024-11-18-13-48-20-A-stylish-and-modern-slide-for-a-clothing-store-with-a-red-black-and.webp",
      title:'Third Slide',
      decription:'three'
    },
  ];
}
