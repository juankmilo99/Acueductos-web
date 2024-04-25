import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../../core/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, take } from 'rxjs';
import { use } from 'marked';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginModalComponent } from '../../login-modal/login-modal.component';
import { mostrarMensaje } from '../../../../core/utilities/mensajes.func';
import { StorageServiceService } from '../../../../core/services/storage-service.service';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrl: './detail-products.component.css'
})
export class DetailProductsComponent implements OnInit {
  producto: any[] = [];
  reviews: any[] = [];
  usuario: any[] = [];  
  mostrarOpiniones: boolean;
  mostrarDescripcion: boolean;
  mostrarPreguntas: boolean;
  preguntas: any[] = [];
  public submittedForm: boolean = false;
  quantity = 1;
  descripcion: string = '';
  username: string;
  public tmpBase64: any;
  modalRef: BsModalRef;
  modalContent: string;
  tempReview = {
    message: '',
    rating: 1,
    product_id: 0,
    user: {
      id: 0
    }
  };
  question ={
    product_id: 0,
    message: "",
    email: "",
    name: ""
  };
  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    public authService: AuthService,
    private modalService: BsModalService,
    public miMensaje: ToastrService,
    private router: Router,
    private storageService: StorageServiceService) {

    this.mostrarDescripcion = true;
    this.mostrarOpiniones = false;
    this.mostrarPreguntas = false;
    this.username = '';
    this.modalRef = this.tmpBase64;
    this.modalContent = '';
  }

  ngOnInit(): void {
    this.authService.onUserLoggedIn.pipe(take(1)).subscribe(() => {
      this.getUsernameFromToken();
      this.getUsuarioByUsername().subscribe(
        (res: any) => {
          this.usuario = res.userResponse.users;       
        },
        (err: any) => {
          console.log(err);
        }
      );
    });

    const id = this.route.snapshot.paramMap.get('codigo');
    this.obtenerProductoPorId(id).subscribe(
      (res: any) => {
        this.producto = res.productoResponse.producto;
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.obtenerReviewsPorId(id).subscribe(
      (res: any) => {
        this.reviews = res.reviewResponse.reviews;
        
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.obtenerPreguntasPorId(id).subscribe(
      (res: any) => {
        this.preguntas = res.questionResponse.questions;          
      },
      (err: any) => {
        console.log(err);
      }
    );

  }

  getUsernameFromToken(): void {
    const token = this.storageService.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const data = JSON.parse(jsonPayload);
      this.username = data.sub;      
    }
  }
  onHover(rating: number): void {
    this.tempReview.rating = rating;
  }

  onLeave(rating: number): void {
    this.tempReview.rating = rating;
  }

public datosValidosReview(): boolean {
  let bandera = true;
  if (this.tempReview.message == '') {
    bandera = false;
  }
  return bandera;
}
public datosValidosQuestion(): boolean {
  let bandera = true;
  if (this.question.message == '' || this.question.email == '' || this.question.name == '') {
    bandera = false;
  }
  return bandera;
}
resetTempReview(): void {
  this.tempReview = {
    message: '',
    rating: 1,
    product_id: 0,
    user: {
      id: 0
    }
  };
}
resetQuestion(): void {
  this.question = {
    message: '',
    email: '',
    name: '',
    product_id: 0
  };
}
submitReview(): void {  
  if (this.datosValidosReview()) {
    this.tempReview.product_id = this.producto[0].id;
    this.tempReview.user.id = this.usuario[0].id;
    console.log(this.tempReview);
    this.tasksService.crearReview(this.tempReview).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        this.resetTempReview();
        mostrarMensaje('success', 'Review creada', 'Enhorabuena', this.miMensaje);
      },
      (err: any) => {
        mostrarMensaje('error', 'Error al crear review', 'Error', this.miMensaje)
        console.log(err);
      }
    );
  } else {
    this.submittedForm = true;
  }
}

submitQuestion(): void {
  this.question.product_id = this.producto[0].id;
  if (this.datosValidosQuestion()) {
    console.log(this.question);
    this.tasksService.crearPreguntas(this.question).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        this.resetQuestion();
        mostrarMensaje('success', 'Pregunta creada', 'Enhorabuena', this.miMensaje);
      },
      (err: any) => {
        mostrarMensaje('error', 'Error al crear pregunta', 'Error', this.miMensaje)
        console.log(err);
      }
    );
  } else {
    this.submittedForm = true;
  }
}
addToCart() {
  if (!this.authService.loggedIn()) {
    // Mostrar el modal de inicio de sesión
    this.abrirModalLogin();
  } else {
    const activeOrderId = localStorage.getItem('activeOrderId');
    if (activeOrderId) {
      // Agregar el producto a la orden activa
      this.tasksService.agregarCarrito(activeOrderId, this.producto[0].id, this.quantity).subscribe(() => {
        // Redirigir al usuario al componente del carrito
        this.router.navigate(['/public/carrito']);
        this.storageService.updateCart(1);
      });
    } else {
      // Crear una nueva orden
      const order = {
        user_id: this.usuario[0].id,
        total_price: 0
      };
      this.tasksService.crearOrden(order).subscribe((res: any) => {
        // Guardar el ID de la orden como la orden activa
        const orderId = res.orderResponse.orders[0].id;
        
        // Agregar el producto a la nueva orden
        this.tasksService.agregarCarrito(orderId, this.producto[0].id, this.quantity).subscribe(() => {
          mostrarMensaje('success', 'Producto agregado al carrito', 'Enhorabuena', this.miMensaje);
          // Redirigir al usuario al componente del carrito
          this.storageService.setItem('activeOrderId', orderId);
          this.storageService.updateCart(1);
          this.router.navigate(['/public/carrito']);
        });
      });
    }
  }
}

  obtenerProductoPorId(id: any): Observable<any> {
    return this.tasksService.obtenerProductosId(id);
  }

  obtenerReviewsPorId(id: any): Observable<any> {
    return this.tasksService.reviewsByProdId(id);
  }

  obtenerPreguntasPorId(id: any): Observable<any> {
    return this.tasksService.preguntasByProdId(id);
  }
  getUsuarioByUsername(): Observable<any> {  
      return this.tasksService.usuariosByUsername(this.username);
    }
    

  toggleOpiniones() {
    this.mostrarOpiniones = !this.mostrarOpiniones;
    this.mostrarDescripcion = false;
    this.mostrarPreguntas = false;
  }

  toggleDescripcion() {
    this.mostrarDescripcion = !this.mostrarDescripcion;
    this.mostrarOpiniones = false;
    this.mostrarPreguntas = false;
  }

  togglePreguntas() {
    this.mostrarPreguntas = !this.mostrarPreguntas;
    this.mostrarDescripcion = false;
    this.mostrarOpiniones = false;
  }

  abrirModalLogin() {
    if (!this.authService.loggedIn()) {
      this.modalRef = this.modalService.show(LoginModalComponent);
      this.modalRef.content.modalRef = this.modalRef;
    }
  }


  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }



}
