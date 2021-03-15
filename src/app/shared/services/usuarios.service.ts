import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { IUsuariosPaginator } from '../models/usuarios.paginator.model';

const server = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  list(pageIndex: number, pageSize: number): Observable<IUsuariosPaginator>  {
    
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('limit', `${pageSize}`)

    return this.http.get<IUsuariosPaginator>(`${server}/api/v1/usuarios`, { params });
  }

  public validaEmail(email: string, id: any): any {
    return this.http.post<any>(`${server}/api/v1/usuarios/valida_email`, { id, email }, { observe: 'response' });
  }

  public index(): any {
    return this.http.get(`${server}/api/v1/usuarios`, { observe: 'response' });
  }

  public view(id: number): any {
    return this.http.get(`${server}/api/v1/usuarios/${id}`, { observe: 'response' });
  }

  public add(user: Usuario): any {
    return this.http.post<any>(`${server}/api/v1/usuarios`, user, { observe: 'response' });
  }

  public edit(usuarioId: number, user: Usuario): any {
    return this.http.put<any>(`${server}/api/v1/usuarios/${usuarioId}`, user, { observe: 'response' });
  }

  public delete(id: number): any {
    return this.http.delete(`${server}/api/v1/usuarios/${id}`, { observe: 'response' });
  }
}
