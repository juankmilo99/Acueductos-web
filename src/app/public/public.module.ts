import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DetailBlogsComponent } from './components/blogs/detail-blogs/detail-blogs.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DetailProductsComponent } from './components/productos/detail-products/detail-products.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarritoComponent } from './components/carrito/carrito.component';




@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProductosComponent,
    LoginComponent,
    RegisterComponent,
    BlogsComponent,
    DetailBlogsComponent,
    ContactoComponent,
    LoginModalComponent,
    DetailProductsComponent,
    CarritoComponent,
    

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RatingModule.forRoot()
  ]
})
export class PublicModule { }
