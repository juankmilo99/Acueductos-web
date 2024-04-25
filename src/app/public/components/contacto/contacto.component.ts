import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  quote: any = {
    name: '',
    email: '',
    description: '',
    cellphone: ''
  };
  public submittedForm: boolean = false;  

  constructor(private tasksService: TasksService,public miMensaje: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  public datosValidosQuote(): boolean {
    let bandera = true;
    if (
      this.quote.name == '' ||
      this.quote.email == '' ||
      this.quote.description == '' ||
      this.quote.cellphone == ''
    ) {
      bandera = false;
    }
    return bandera;
  }

  createQuote() {
    if (this.datosValidosQuote()) {
      console.log(this.quote);
      this.tasksService.crearQuote(this.quote)
        .subscribe(
          (res: any) => {            
            mostrarMensaje('success', 'Mensaje enviado con exito', 'Enhorabuena', this.miMensaje);
            this.router.navigate(['/public']); 
          },
          (err: any) => {            
            mostrarMensaje('error', 'Error al enviar el mensaje', 'Error', this.miMensaje);
          }
        );
    } else {
      this.submittedForm = true;
    }
  }

}
