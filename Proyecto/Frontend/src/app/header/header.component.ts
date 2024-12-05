import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../interfaces/product';
import { CarritoService } from '../services/carrito.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public carritoService:CarritoService, public authServive: AuthService){}
  public role: string | null = null;
  public username: string | null = null;
  public showUserMenu = false;


  ngOnInit(): void {
    // Obtener datos del localStorage
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
  }

  logOut(){
    this.authServive.logout();
  }
  
  hideTimeout: any;

toggleUserMenu(show: boolean): void {
  if (show) {
    // Cancelar cualquier temporizador para cerrar el menú
    clearTimeout(this.hideTimeout);
    this.showUserMenu = true;
  } else {
    // Retrasar el cierre para evitar cierres accidentales
    this.hideTimeout = setTimeout(() => {
      this.showUserMenu = false;
    }, 200); // Puedes ajustar el tiempo según tus necesidades
  }
}

}