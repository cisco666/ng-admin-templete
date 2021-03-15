import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { Usuario } from '../shared/models/usuario.model';
import { CambioImagenService } from '../shared/services/cambio-imagen.service';

const imageSrv = environment.imageUrl;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public isCollapsed = false;
  imagenSuscriber$: any;
  userImage: string;
  currentUser: Usuario;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected imagenService: CambioImagenService
  ) { }

  ngOnInit(): void {
    this.currentUser = new Usuario();
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser.imagenes_usuario) {
      this.userImage = imageSrv + '/' + this.currentUser.imagenes_usuario.dir + '/' + this.currentUser.imagenes_usuario.nombre;
    } else { 
      this.userImage = 'assets/img/default-user.png';
    }

    this.imagenSuscriber$ = this.imagenService.imagenDir$.subscribe(data => {
      this.userImage = imageSrv + '/' + data.dir + '/' + data.nombre;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.imagenSuscriber$.unsubscribe();
  }
}
