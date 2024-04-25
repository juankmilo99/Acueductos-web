import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    SharedComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
  ]
})
export class SharedModule { }
