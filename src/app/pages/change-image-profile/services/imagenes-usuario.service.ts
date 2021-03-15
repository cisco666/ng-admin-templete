import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ImagenUsuario } from 'src/app/shared/models/imagen-usuario.model';

const server = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ImagenesUsuarioService {

  constructor(private http: HttpClient) { }

  public uploadImage(imageData: any) {
    return this.http.post<any>(`${server}/api/v1/imagenes_usuario`, imageData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
