import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = environment.urlServer;

  constructor(private http: HttpClient,private authService: AuthService) { }

/////////////////////////////////////Productos///////////////////////////////////////////////////////////////////////////////////////////
  
obtenerProductosCategoria(category: any): any{
  return this.http.get(`${this.apiUrl}/productos/category/${category}`);
}

obtenerProductosId(Id: any): any{
  return this.http.get(`${this.apiUrl}/productos/${Id}`);
}

reviewsByProdId(Id: any): any{
  return this.http.get(`${this.apiUrl}/reviews/product/${Id}`);
}

crearReview(rev: any): any {
  return this.http.post(`${this.apiUrl}/reviews`, rev);
}

preguntasByProdId(Id: any): any{
  return this.http.get(`${this.apiUrl}/questions/product/${Id}`);
}

usuariosByUsername(username: any): any{
  return this.http.get(`${this.apiUrl}/usuarios/username/${username}`);
}

usuarioById(id: any): any{
  return this.http.get(`${this.apiUrl}/usuarios/${id}`);
}

crearPreguntas(questions: any): any {
  return this.http.post(`${this.apiUrl}/questions`, questions);
}

crearOrden(orden: any): any {
  return this.http.post(`${this.apiUrl}/orders`, orden);
}
enviarCorreo(correo: any): any {
  return this.http.post(`${this.apiUrl}/orders/send-email`, correo);
}
agregarCarrito(ordenid: any,product_id:any,quantity:any): any {
  return this.http.post(`${this.apiUrl}/orders/cart/${ordenid}/${product_id}/${quantity}`,{});
}

obtenerOrdenesById(id:any): any {
  return this.http.get(`${this.apiUrl}/orders/${id}`);
}

updateCarrito(ordenid: any,product_id:any,quantity:any): any {
  return this.http.put(`${this.apiUrl}/orders/update/${ordenid}/${product_id}/${quantity}`,{});
}



/////////////////////////////////////Categorias///////////////////////////////////////////////////////////////////////////////////////////
obtenerCategorias(): any{
  return this.http.get(`${this.apiUrl}/categories`);
}

/////////////////////////////////////Blogs///////////////////////////////////////////////////////////////////////////////////////////

obtenerBlogs(): any{
  return this.http.get(`${this.apiUrl}/blogs`);
}

obtenerBlogsId(id:any): any{
  return this.http.get(`${this.apiUrl}/blogs/${id}`);
}

/////////////////////////////////////Quotes///////////////////////////////////////////////////////////////////////////////////////////
crearQuote(quote: any): any {
  return this.http.post(`${this.apiUrl}/quotes`, quote);
}



  /////////////////////////////////////Providers///////////////////////////////////////////////////////////////////////////////////////////
  getProviders() {
    let Headers = new HttpHeaders({authorization : 'Bearer ' + this.authService.getToken()});
    return this.http.get<any>(this.apiUrl + '/providers', { headers: Headers });
  }
  
  getCountries() {
    let Headers = new HttpHeaders({authorization : 'Bearer ' + this.authService.getToken()});
    return this.http.get<any>(this.apiUrl + '/countries', { headers: Headers });
  }
  crearProvCountries(prov:any) {
    let json = JSON.stringify(prov);
    let Headers = new HttpHeaders({authorization : 'Bearer ' + this.authService.getToken()}).set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl + '/providers-country', json , { headers: Headers });
  }
  
}
