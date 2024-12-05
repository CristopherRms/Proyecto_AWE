import { NgStyle } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() slides: any[] = [];
  currentSlide = 0;
  private timer: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previous() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  private startAutoSlide() {
    this.timer = setInterval(() => {
      this.next();
    }, 5000); // Cambia cada 5 segundos
  }

  private stopAutoSlide() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
