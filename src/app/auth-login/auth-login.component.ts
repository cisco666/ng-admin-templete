import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { AlertsService } from '../shared/messages/alerts.service';
import { ImagenUsuario } from '../shared/models/imagen-usuario.model';
import { Login } from '../shared/models/login.model';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  providers: [AlertsService]
})
export class AuthLoginComponent implements OnInit {
  
  clicked: boolean = false;
  currentUser: Usuario;
  signinForm: FormGroup;

  constructor(
    public router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertsService
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if (this.authService.isLoggedIn) { 
      //this.router.navigate(['dashboard'], { replaceUrl: true });
    }
  }

  loadUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  submitForm(): void {
    for (const i in this.signinForm.controls) {
      this.signinForm.controls[i].markAsDirty();
      this.signinForm.controls[i].updateValueAndValidity();
    }

    if (this.signinForm.valid) {
      
      this.clicked = true;

      let login = new Login();
      login.usuario = new Usuario();
      login.usuario.imagenUsuario = new ImagenUsuario();

      this.authService.signIn(this.signinForm.value)
        .toPromise()
        .then(res => {

          login.code = res.body.code;
          login.token = res.body.token;
          login.usuario = res.body.usuario;

          localStorage.setItem('current_user', JSON.stringify(login.usuario));
          localStorage.setItem('access_token', login.token);

          this.alertService.createMessage('success', `¡Bienvenido(a) ${login.usuario.email} !`, 10000);

          this.router.navigate(['dashboard'], { replaceUrl: true });

          this.clicked = false;
        })
        .catch(err => {
          if (err.status === 401) {
            this.alertService.createMessage('error', err.error.message, 5000);
          } else {
            this.alertService.createMessage('error', err.message, 5000);
          }

          this.clicked = false;
        });
    }
  }
}
