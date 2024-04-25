import { Component, Input } from '@angular/core';
import { Auth } from '../../../core/models/Auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Input() modalRef: BsModalRef;
  public tmpBase64: any; 
  modalContent: string;
  public auth: Auth;
  

  constructor(public authService: AuthService,private modalService: BsModalService,public miMensaje: ToastrService,private router: Router) {
    this.modalRef = this.tmpBase64;
    this.modalContent = '';
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
            localStorage.setItem('token', res.jwtToken);
            this.modalRef.hide();
            this.router.navigateByUrl(this.router.url);
            mostrarMensaje('success', 'Usuario Logeado', 'Enhorabuena', this.miMensaje);
          },
          (err: any) => {
            console.log(err),
              mostrarMensaje('error', 'credenciales incorrectas', 'Error', this.miMensaje)
          }
        );
    } else {
      mostrarMensaje('error', 'credenciales incorrectas', 'Error', this.miMensaje)
    }
  }
  public btnCancelar(): void {
    this.modalRef.hide();
  }

  public btnLogin(): void {
    this.logIn();
    this.btnCancelar();

  }
  public btnRegister(): void {
    this.router.navigate(['/public/register']);
    this.btnCancelar();
  }
}
