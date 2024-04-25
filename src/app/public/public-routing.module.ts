import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from '../shared/components/login/login.component';
import { Register } from '../core/models/Register.model';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DetailBlogsComponent } from './components/blogs/detail-blogs/detail-blogs.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { DetailProductsComponent } from './components/productos/detail-products/detail-products.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  {
    path:'',
    component:PublicComponent,
    children:[
      {path:'home',component: HomeComponent},
      {path:'productos',component: ProductosComponent},
      {path:'productos/detail/:codigo',component: DetailProductsComponent},      
      {path:'register',component: RegisterComponent},
      {path:'carrito',component: CarritoComponent},
      {path:'blogs',component: BlogsComponent},
      {path:'blogs/detail/:codigo',component: DetailBlogsComponent},
      {path:'contacto',component: ContactoComponent},
     
      

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
