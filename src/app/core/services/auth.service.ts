import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.urlServer;
  onUserLoggedIn = new EventEmitter<void>();

  constructor(private http: HttpClient,private router: Router) {    
   }

   signUpUser(user: any): any {
    let json = JSON.stringify(user);
    let Headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/authenticate', json, { headers: Headers });
    
  }
  registerUser(user: any): any {
    let json = JSON.stringify(user);
    let Headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/usuarios', json, { headers: Headers });
  }

  loggedIn() {
    if (typeof window !== 'undefined') {
      const loggedIn = !!localStorage.getItem('token');
      if (loggedIn) {
        this.onUserLoggedIn.emit();
      }
      return loggedIn;
    }
    return false;
  
  }

  logOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.router.navigate(['/public']);
    }
    return false;
    
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return false;
    
  }
}
