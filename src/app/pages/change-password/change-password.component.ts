import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, FormControl } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { AlertsService } from 'src/app/shared/messages/alerts.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { ChangePasswordValidator } from './change-password-validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public clicked: boolean;
  public changePassword: FormGroup;
  usuarioId: any;
  usuario: Usuario;
  currentUser: Usuario;

  headerEmail: string;

  allowedRols = ['SUPERUSUARIO', 'ADMINISTRADOR'];

  imNotThisUser: boolean = false;

  constructor(
    private title: Title,
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private alertService: AlertsService
  ) {
    this.changePassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      repeatPassword: ['', [this.confirmValidator]],
    });

    this.usuario = new Usuario();
    this.usuarioId = parseInt(this.actRoute.snapshot.paramMap.get('id'));

    this.currentUser = this.authService.getCurrentUser();

    if (Number(this.usuarioId) != this.currentUser.id) {

      if (this.allowedRols.includes(this.currentUser.rol)) {
        this.imNotThisUser = true;
      } else {
        this.alertService.createMessage('warning', `No cuentas con los permisos necesarios para realizar esta acción`, 10000);
        this.router.navigate(['/']);
      }
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Cambiar contraseña');

    this.headerEmail = '...';

    if (!this.imNotThisUser) {
      this.usuario = this.currentUser;
      this.headerEmail = this.usuario.email;
    } else {
      this.authService.getUserProfile(this.usuarioId)
      .toPromise()
      .then(user => { 
        this.usuario = user.body.usuario;
        this.headerEmail = this.usuario.email;
      })
      .catch(err => { 
        console.log(err);
      });
    }
  }

  submitForm(value: {password: string; repeatPassword: string; }): void {
    for (const key in this.changePassword.controls) {
      this.changePassword.controls[key].markAsDirty();
      this.changePassword.controls[key].updateValueAndValidity();
    }
    this.cambiarPassword();
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.changePassword.controls.repeatPassword.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.changePassword.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  cambiarPassword() { 
    if (this.changePassword.valid) { 
      let usrPsw = new Usuario();
      this.clicked = true;

      usrPsw.password = this.changePassword.get('password').value;

      this.authService.changePassword(this.usuarioId, usrPsw)
        .toPromise()
        .then(resp => {
          this.resetForm();

          let message: string;

          if (this.imNotThisUser) {
            message = `La contraseña para ${ this.headerEmail} fue actualizada correctamente!`;
            this.router.navigate(['usuarios']);
          } else {
            message = `Contraseña actualizada correctamente, para aplicar el cambio es necesario cerrar sesión y volver a ingresar!`;
          }

          this.alertService.createMessage('success', message, 10000);

          this.clicked = false;
        }).catch(err => {
          this.clicked = false;
        });
    }
  }

  resetForm(): void {
    this.changePassword.reset();
    for (const key in this.changePassword.controls) {
      this.changePassword.controls[key].markAsPristine();
      this.changePassword.controls[key].updateValueAndValidity();
    }
  }
}
