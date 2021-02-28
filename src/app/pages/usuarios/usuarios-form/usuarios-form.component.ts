import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/messages/alerts.service';
import { ImagenUsuario } from 'src/app/shared/models/imagen-usuario.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['../usuarios.component.css'],
  providers: [AlertsService]
})
export class UsuariosFormComponent implements OnInit {

  headerTitle: string;
  usuarioId: any;
  isUpdate: boolean = false;
  clicked: boolean = false;
  loaded: boolean = false;
  buttonMessage: string;

  validaEmail: string;

  public roles: string[] = ['SUPERUSUARIO', 'ADMINISTRADOR', 'USUARIO'];
  usuarioForm: FormGroup;

  usuario: Usuario;

  constructor(
    private title: Title,
    private actRoute: ActivatedRoute,
    protected usuariosService: UsuariosService,
    public fb: FormBuilder,
    public router: Router,
    private alertService: AlertsService
  ) { }

  ngOnInit(): void {

    this.usuario = new Usuario();
    this.usuario.imagenUsuario = new ImagenUsuario();

    this.usuarioId = this.actRoute.snapshot.paramMap.get('id');

    if (this.usuarioId) { 
      this.isUpdate = true;
      this.headerTitle = 'Actualizar Información';
      this.buttonMessage = 'Actualizar Información';
      this.initForm();
      this.loadUser();
    } else {
      this.headerTitle = 'Registrar Usuario';
      this.buttonMessage = 'Registrar Información';
      this.loaded = true;
      this.initForm();
    }

    this.title.setTitle(this.headerTitle);
  }

  initForm(): void {
    if (!this.isUpdate) {
      this.usuarioForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        active: [false, Validators.required],
        rol: ['', Validators.required]
      }); 
    } else {
      this.usuarioForm = this.fb.group({
        email: ['', Validators.required],
        active: [false, Validators.required],
        rol: ['', Validators.required]
      });
    }
  }

  loadUser(): void {
    this.usuarioId = parseInt(this.usuarioId);

    this.usuariosService.view(this.usuarioId).subscribe(res => {
      this.usuario = res.body.usuario;

      this.usuarioForm.patchValue({
        email: this.usuario.email.toLowerCase(),
        active: this.usuario.active,
        rol: this.usuario.rol
      });

      this.loaded = true;
    });
  }

  validarEmail(email: string) {
    if (email) {
      this.validaEmail = 'validating';

      this.usuariosService.validaEmail(email).subscribe(res => {

        if (res.body.code === 200) {
          this.validaEmail = 'success';
          this.alertService.createMessage('success', res.body.message, 5000);
        } else {
          this.validaEmail = 'error';
          this.alertService.createMessage('error', res.body.message, 5000);
        }
      }); 
    }
  }

  registrar(): void {
    for (const i in this.usuarioForm.controls) {
      this.usuarioForm.controls[i].markAsDirty();
      this.usuarioForm.controls[i].updateValueAndValidity();
    }

    if (this.usuarioForm.valid) {
      this.clicked = true;
      this.usuario = new Usuario();
      this.usuario = this.usuarioForm.value;

      this.usuariosService.add(this.usuario).subscribe(res => {

        if (res.body.code === 200) {
          this.alertService.createMessage('success', res.body.message, 10000);
          this.router.navigate([`usuarios/editar/${res.body.usuario.id}`], { replaceUrl: true }); 
        } else {
          this.alertService.createMessage('error', res.body.message, 10000);
          console.log(res.body.error);
        }

        this.clicked = false;
      });

      console.log(this.usuario);
    }
  }

  actualizar() {
    for (const i in this.usuarioForm.controls) {
      this.usuarioForm.controls[i].markAsDirty();
      this.usuarioForm.controls[i].updateValueAndValidity();
    }

    if (this.usuarioForm.valid) {
      this.clicked = true;
      this.usuario = new Usuario();
      this.usuario = this.usuarioForm.value;

      this.usuariosService.edit(this.usuarioId, this.usuario).subscribe(res => {

        if (res.body.code === 200) {
          this.alertService.createMessage('success', res.body.message, 10000);
          this.router.navigate([`usuarios/editar/${res.body.usuario.id}`], { replaceUrl: true }); 
        } else {
          this.alertService.createMessage('error', res.body.message, 10000);
          console.log(res.body.error);
        }

        this.clicked = false;
      });
    }
  }
}
