import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const server = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  public signUp(user: Usuario) {
    return this.http.post<any>(`${server}/api/v1/usuarios`, user, { observe: 'response' });
  }

  // Sign-in
  signIn(user: Usuario) {
    return this.http.post<any>(`${server}/api/v1/usuarios/login`, user, { observe: 'response' });
  }

  public changePassword(usuarioId: number, user: Usuario): any {
    return this.http.put<any>(`${server}/api/v1/usuarios/${usuarioId}`, user, { observe: 'response' });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUSerLogged = localStorage.removeItem('current_user');
    if (removeToken == null && removeUSerLogged == null) {
      this.router.navigate(['auth/login']);
    }
  }

  // User profile
  getUserProfile(id: number): any {
    return this.http.get(`${server}/api/v1/usuarios/${id}`, { observe: 'response' });
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
