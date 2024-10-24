import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Input } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent,FooterComponent,HeaderComponent,ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slides: any[]=[
    {
      url:"data:image/jpeg;base64,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",
      title:'Second Slide',
      decription:'two'
    },
    {
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRCdKi9Mx1OehUS6_duKiRcRbAGSwC4Dg2A&s",
      title:'First Slide',
      decription:'One'
    },
    {
      url:"Proyecto/src/assets/images/1AA.png",
      title:'Third Slide',
      decription:'three'
    },
  ];
}