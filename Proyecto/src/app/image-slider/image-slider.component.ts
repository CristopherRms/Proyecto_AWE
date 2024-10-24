import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent {
  @Input() slides: any[]=[];
  currentSlide = 0;

  next(){
    this.currentSlide = (this.currentSlide+1) % this.slides.length;
  }
  previous(){
    this.currentSlide=(this.currentSlide - 1 +this.slides.length)%this.slides.length;
  }
}
