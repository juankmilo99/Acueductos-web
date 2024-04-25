import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'public',
    component: AppComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'shared',
    component: AppComponent,
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
