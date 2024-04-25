import { Component } from '@angular/core';
import { Register } from '../../../core/models/Register.model';
import { AuthService } from '../../../core/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public register: Register;
  public submittedForm: boolean = false;
  public confirmPassword: string = '';

  constructor(private authService: AuthService,private modalService: BsModalService,public miMensaje: ToastrService,private router: Router) {
    this.register = new Register('', '', '', '', '', '', '', '');
   }

   public datosValidosRegistro(): boolean {
    let bandera = true;
    if (
      this.register.username == '' ||
      this.register.address == '' ||
      this.register.city == '' ||
      this.register.email == '' ||
      this.register.password == '' ||
      this.register.firstName == '' ||
      this.register.lastName == '' ||
      this.register.cellphone == ''
    ) {
      bandera = false;
    }
    return bandera;
  }

  registerUser() {
    if (this.datosValidosRegistro()) {
      if (this.register.password === this.confirmPassword) {    
        this.authService.registerUser(this.register)
          .subscribe(
            (res: any) => {       
              localStorage.setItem('token', res.jwtToken);
              this.router.navigate(['/public']);
              mostrarMensaje('success', 'Usuario Registrado', 'Enhorabuena', this.miMensaje);
            },
            (err: any) => {             
              if (err.error && err.error.metadata && err.error.metadata.length > 0) {
                const mensaje = err.error.metadata[0].dato;               
                mostrarMensaje('warning', mensaje, 'Error', this.miMensaje);
              } else {
                console.error(err);
                mostrarMensaje('error', 'Ocurrió un error desconocido', 'Error', this.miMensaje);
              }
            }
          );
      } else {
        mostrarMensaje('warning', 'Las contraseñas no coinciden', 'Error', this.miMensaje);
      }
    } else {
      this.submittedForm = true;
    }
  }

}
