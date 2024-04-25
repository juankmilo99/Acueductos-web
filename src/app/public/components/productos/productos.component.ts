import { Component, OnInit, TemplateRef } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { AuthService } from '../../../core/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';
import { Auth } from '../../../core/models/Auth.model';
import { Observable } from 'rxjs';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
public productos:any=[];
public categorias:any=[];
public tmpBase64: any;
  modalRef: BsModalRef;
  modalContent: string;
  public auth: Auth;
  public descripcionCategoria: string = '';
  constructor(private tasksService: TasksService,public authService: AuthService,private modalService: BsModalService,public miMensaje: ToastrService,private router: Router) { 
    this.modalRef = this.tmpBase64;
    this.modalContent = '';
    this.auth = new Auth('', '');
    
  }

  ngOnInit(): void {     
    this.optenerCategorias().subscribe(
      (res: any) => {  
        this.categorias = res.categoryResponse.categories;
        this.productosCategoria(1);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  productosCategoria(category: any): any {
    this.tasksService.obtenerProductosCategoria(category)
      .subscribe(
        (res: any) => {        
          this.productos = res.productoResponse.producto;
        // Buscar la categoría correspondiente y actualizar la descripción
        const categoria = this.categorias.find((c: { id: number }) => c.id === category);
        if (categoria) {
          this.descripcionCategoria = categoria.description;         
        }
        },
        (err: any) => {
          console.log(err)
        }
      );
  }

  optenerCategorias(): Observable<any> {
     return this.tasksService.obtenerCategorias()     
   
  }

  public abrirDetailProd(codProd:any): void {
    this.router.navigate(['/public/productos/detail/'+ codProd]);
  }

  
  onAddToCartClick() {
    if (!this.authService.loggedIn()) {
      this.modalRef = this.modalService.show(LoginModalComponent);
      this.modalRef.content.modalRef = this.modalRef;
    } else {
      // Aquí puedes agregar el producto al carrito
    }
  }

  

}
