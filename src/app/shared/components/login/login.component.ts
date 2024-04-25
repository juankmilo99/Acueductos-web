import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { mostrarMensaje } from '../../../core/utilities/mensajes.func';
import { Auth } from '../../../core/models/Auth.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submittedForm = false;
  public auth: Auth;
  constructor(private authService: AuthService, private router: Router, public miMensaje: ToastrService) {
    this.auth = new Auth('', '');
  }


  public datosValidosLogin(): boolean {
    let bandera = true;
    if (
      this.auth.usuario == '' ||
      this.auth.contrasenia == ''
    ) {
      bandera = false;
    }
    return bandera;
  }

  logIn(): any {
    if (this.datosValidosLogin()) {
      this.authService.signUpUser(this.auth)
        .subscribe(
          (res: any) => {
            console.log(res.jwtToken);
            localStorage.setItem('token', res.jwtToken);
            this.router.navigate(['/public']);
          },
          (err: any) => {
            console.log(err),
              mostrarMensaje('error', 'credenciales incorrectas', 'Error', this.miMensaje)
          }
        );
    } else {
      this.submittedForm = true;
    }
  }

}
