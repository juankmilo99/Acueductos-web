import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { StorageServiceService } from '../../../core/services/storage-service.service';
import { After } from 'v8';
import { FormControl } from '@angular/forms';
import { Observable, filter, forkJoin } from 'rxjs';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit, AfterViewInit {
  Productos: any[] = [];
  usuario: any;
  userId: any;
  quantity = 0;
  total = 0;
  @ViewChild('wompiWidget', { static: false }) wompiWidget!: ElementRef;
  paymentMethod = new FormControl('');
  constructor(private tasksService: TasksService, private storageService: StorageServiceService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private modalService: BsModalService,
    public miMensaje: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    const activeOrderId = this.storageService.getItem('activeOrderId');
    if (activeOrderId) {
      this.tasksService.obtenerOrdenesById(activeOrderId).subscribe(
        (res: any) => {
          this.Productos = res.orderResponse.orders[0].items;
          this.userId = res.orderResponse.orders[0].user_id;

          this.tasksService.usuarioById(this.userId).subscribe(
            (res: any) => {
              this.usuario = res.userResponse.users;
            },
            (err: any) => {
              console.log(err);
            }
          );
          this.calculateTotal();
          if (this.Productos.length === 0) {
            this.storageService.updateCart(0);
          }
        },
        (err: any) => {
          console.log(err);
        }

      );


    }



  }

  ngAfterViewInit() {
    this.paymentMethod.valueChanges.pipe(
      filter(value => value === 'wompi')
    ).subscribe(() => {
      setTimeout(() => {
        this.insertScript();
      }, 0);
    });
  }

  increment(producto: any) {
    producto.quantity++;
    this.calculateTotal();
  }

  decrement(producto: any) {
    if (producto.quantity > 1) {
      producto.quantity--;
      this.calculateTotal();
    } else if (producto.quantity === 1) {
      this.tasksService.updateCarrito(this.storageService.getItem('activeOrderId'), producto.product.id, 0).subscribe(() => {
        this.calculateTotal();
        this.ngOnInit();

      });
    }
  }

  calculateTotal() {
    this.total = this.Productos.reduce((total, producto) => total + producto.product.price * producto.quantity, 0);
  }



  // ...

  confirmarCompra() {
    const updates$ = this.Productos.map(producto => this.tasksService.updateCarrito(
      this.storageService.getItem('activeOrderId'),
      producto.product.id,
      producto.quantity
    ));

    forkJoin(updates$).subscribe(() => {
      const email = this.usuario[0].email;
      const subject = `Confirmación de su pedido nº ${this.storageService.getItem('activeOrderId')}`;

      const productsTableRows = this.Productos.map(producto => `
            <tr>
                <td>${producto.product.name}</td>
                <td>$ ${producto.product.price}</td>
                <td>${producto.quantity}</td>
                <td>$ ${producto.product.price * producto.quantity}</td>
            </tr>
        `).join('');

      const body = `
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 80%;
            margin: auto;
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #416787;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hola ${this.usuario[0].username},</h1>
        <p>¡Muchas gracias por realizar tu pedido en FlowStore!</p>
        <p>A continuación te mostramos todos los datos de tu compra.</p>
        <table>
            <tr>
                <th>Concepto</th>
                <th>Precio Unidad</th>
                <th>Unidades</th>
                <th>Total</th>
            </tr>
            ${productsTableRows}
            <tr>
                <td colspan="3">Total</td>
                <td>$ ${this.Productos.reduce((total, producto) => total + producto.product.price * producto.quantity, 0)}</td>
            </tr>
        </table>
        <p><strong>Dirección de Envío:</strong> ${this.usuario[0].address.trim()} - ${this.usuario[0].city.trim()}</p>
        <p><strong>Forma de pago:</strong> Transferencia Bancaria</p>        
        <p><strong>Estado del Pago:</strong> Pendiente</p>
        <br>        
        <p><strong>Banco Beneficiario:</strong> BANCO BANCOLOMBIA</p>
        <p><strong>Número de cuenta:</strong> 3208761006</p>
        <p><strong>Tipo de Cuenta:</strong> Cuenta De Ahorros</p>
    </div>
</body>
</html>
`;


      const emailData = {
        email: email,
        subject: subject,
        body: body
      };

      console.log(emailData);
      this.tasksService.enviarCorreo(emailData).subscribe((response: any) => {
        console.log(response);
      });

      mostrarMensaje('success', 'Pedido Realizado', 'Enhorabuena', this.miMensaje);
      this.storageService.removeItem('activeOrderId');
      this.storageService.updateCart(0);
      this.storageService.removeItem('cart');
      this.router.navigate(['/public/home']);
    });
  }
  obtenerUsuarioPorId(id: any): Observable<any> {
    return this.tasksService.usuarioById(id);
  }

  insertScript(): void {
    // Busca el script de Wompi en el documento
    const existingScript = this.elementRef.nativeElement.querySelector('script[src="https://checkout.wompi.co/widget.js"]');

    // Si el script ya existe, no hagas nada
    if (existingScript) {
      return;
    }

    // Si el script no existe, créalo e insértalo
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(
      script,
      'src',
      'https://checkout.wompi.co/widget.js'
    );
    this.renderer.setAttribute(script, 'data-render', 'button');
    this.renderer.setAttribute(
      script,
      'data-public-key',
      'pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH'
    );
    this.renderer.setAttribute(script, 'data-currency', 'COP');
    this.renderer.setAttribute(script, 'data-amount-in-cents', '4950000');
    this.renderer.setAttribute(script, 'data-reference', '4XMPGKWWPKWQ');
    this.renderer.setAttribute(
      script,
      'data-signature:integrity',
      '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5'
    );

    this.renderer.appendChild(this.wompiWidget.nativeElement, script);
  }



}
