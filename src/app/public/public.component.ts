import { Component } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {
  public showSidebar;
  constructor() {
    this.showSidebar = true;
  }

  public toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
