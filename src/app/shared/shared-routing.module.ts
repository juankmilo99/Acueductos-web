import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './shared.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:SharedComponent,
    children:[
      {path:'login',component: LoginComponent},
      

      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
