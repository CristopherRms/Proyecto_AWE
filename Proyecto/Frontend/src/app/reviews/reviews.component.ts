import { NgFor, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Reviews } from '../interfaces/reviews';
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  reviews: Reviews[] = []; // Lista de reseñas
  newReview: Reviews = { user: '', description: '', date: '' }; // Reseña para el formulario
  
  public username: string | null = null;
  public role: string | null = null;
  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews();
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  // Cargar reseñas desde la API
  loadReviews(): void {
    this.reviewsService.getReviews().subscribe((data) => {
      this.reviews = data;
    });
  }

  // Crear una nueva reseña
  addReview(): void {
    this.newReview.user= this.username;
    this.newReview.date = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    this.reviewsService.createReview(this.newReview).subscribe((createdReview) => {
      this.reviews.push(createdReview); // Agregar la nueva reseña a la lista
      this.newReview = { user: '', description: '', date: '' }; // Resetear el formulario
    });
  }
 
}