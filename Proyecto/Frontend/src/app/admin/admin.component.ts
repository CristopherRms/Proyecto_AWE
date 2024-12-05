import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/users.service';
import { Users } from '../interfaces/users';
import { Input } from '@angular/core';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private ProductoService: ProductService, private UserService:UserService) { }

  ngOnInit(): void {
    this.getProducts();
    this.UserService.fetchUsers();
  }
  searchId: string = '';
  selectedProduct: any = null;
  showEditForm: boolean = false;
  // Lista de productos existentes
  productList: Product[] = [];

  // Objeto para almacenar el nuevo producto
  newProduct: Product = {
    _id: '',
    title: '',
    price: 0,
    description: '',
    category: '',
    tallas: [],
    images: []
  };

  // Método para obtener los productos
  getProducts() {
    
    this.ProductoService.getProductos().subscribe({
      next: (response) => {
        this.productList = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  addProduct(): void {
    this.ProductoService.addProducto(this.newProduct);
    this.newProduct={
          _id: '',
        title: '',
        price: 0,
        description: '',
        category: '',
        tallas: [],
        images: []
    }
    this.getProducts();
  }

    deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.ProductoService.deleteProduct(id);
    }
    
    alert('Producto eliminado');
    this.getProducts();
    }
    searchProduct() {
    this.selectedProduct = this.productList.find(product => product._id === this.searchId);
    if (!this.selectedProduct) {
      alert('Product not found!');
    }else{
      this.showEditForm = true;
    }
    }

    updateProduct() {
      if (this.selectedProduct) {
        this.ProductoService.updateProduct(this.selectedProduct._id, this.selectedProduct);
        
      }
      this.showEditForm = false;
    }



    @Input() user!: Users;
    // Controla la visibilidad del modal de edición
    editModalVisible: boolean = false;
    visible: boolean = false;
  
    showDialog() {
      this.visible = true;
    }
  
    // Datos editados
    editedUser: Users = {
      username: '',
      password: '',
      role: '',
    };
  
    newUser: Users = {
      username: '',
      password: '',
      role: '',
    };
  
    public get users(): Users[] {
      return this.UserService.users;
    }
  
    
      getUsers(){
        return this.UserService.fetchUsers();
      }

  
    // Eliminar usuario
    deleteUser(userID: string): void {
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        this.UserService.deleteUser(userID);
      }
    }
  
    // Iniciar edición de un usuario
    isEditModalOpen: boolean = false;

  startEdit(user: any) {
    this.editedUser = { ...user };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }
  
    // Actualizar usuario
    updateUser(): void {
      if (this.editedUser._id) {
        // Verificamos si '_id' está presente
        this.UserService.updateUser(this.editedUser._id, this.editedUser); // Usamos '_id' para actualizar
        this.closeEditModal();// Cierra el modal después de la actualización
      } else {
        console.log('No se pudo encontrar el ID del usuario.');
      }
    }
    
    createUser(): void {
      if (this.newUser.username && this.newUser.password && this.newUser.role) {
        this.UserService.createUser(this.newUser); // Llama al servicio para crear el post
        // Limpia el formulario después de crear el post
        this.resetUserForm();
      } else {
        console.log('Completa todos los campos antes de continuar');
      }
    }
  
    resetUserForm(): void {
      this.newUser = {
        username: '',
        password: '',
        role: '',
      };
    }
    cancelPost(): void {
      this.visible = false;  // Cierra el modal
      this.resetUserForm();  // Limpia el formulario completamente
    }
  }