import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoComponent } from './carrito/carrito.component';
import { IndividualComponent } from './individual/individual.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "carrito", component: CarritoComponent },
    { path: "individual/:id", component: IndividualComponent },
    { path: "categoria/:cat", component: CategoriaComponent },
    { path: "login", component:LoginComponent},
    { path: "administrar", component:AdminComponent},
    { path: "", redirectTo: "home", pathMatch: "full"}
];
