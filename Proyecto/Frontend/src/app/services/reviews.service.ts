import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reviews } from '../interfaces/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8080/api/reviews'; // Cambia a tu endpoint real

  constructor(private http: HttpClient) {}

  // Obtener todas las reseñas
  getReviews(): Observable<Reviews[]> {
    return this.http.get<Reviews[]>(this.apiUrl);
  }

  // Crear una nueva reseña
  createReview(review: Reviews): Observable<Reviews> {
    return this.http.post<Reviews>(this.apiUrl, review);
  }

  // Eliminar una reseña por ID
  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
