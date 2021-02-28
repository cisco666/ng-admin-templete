import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth/auth.service';
import { CambioImagenService } from '../shared/services/cambio-imagen.service';

const imageSrv = environment.imageUrl;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isCollapsed = false;

  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected imagenService: CambioImagenService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
