import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mostrarMensaje } from '../../../core/utilities/mensajes.func';
import { Auth } from '../../../core/models/Auth.model';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { StorageServiceService } from '../../../core/services/storage-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input()
  public showSidebar:any;
  @Output()
  public clickHamburger = new EventEmitter<void>();
  public tmpBase64: any;
  modalRef: BsModalRef;
  modalContent: string;
  public auth: Auth;
  activeOrderId: any;
  cart: any;
  constructor(public authService: AuthService,private modalService: BsModalService,
    public miMensaje: ToastrService,
    private router: Router,
    private storageService: StorageServiceService) {
    this.modalRef = this.tmpBase64;
    this.modalContent = '';
    this.auth = new Auth('', '');
   
   }

  ngOnInit(): void {
    this.storageService.currentCart.subscribe(cart => this.cart = cart);    
  }

  toggleSidebar() {
    this.clickHamburger.emit();
  }
  onMyAccountClick() {
    if (!this.authService.loggedIn()) {
      this.modalRef = this.modalService.show(LoginModalComponent);
      this.modalRef.content.modalRef = this.modalRef;
    }
  }

  

  

}
