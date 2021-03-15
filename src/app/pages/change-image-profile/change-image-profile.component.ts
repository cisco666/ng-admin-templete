import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ImagenUsuario } from 'src/app/shared/models/imagen-usuario.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { ImagenesUsuarioService } from './services/imagenes-usuario.service';
import { environment } from 'src/environments/environment';
import { CambioImagenService } from 'src/app/shared/services/cambio-imagen.service';
import { AlertsService } from 'src/app/shared/messages/alerts.service';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

const server = environment.serverUrl;

const imageSrv = environment.imageUrl;

const DEFAULT_IMAGE = 'assets/img/default-user.png';

@Component({
  selector: 'app-change-image-profile',
  templateUrl: './change-image-profile.component.html',
  styleUrls: ['./change-image-profile.component.css']
})
export class ChangeImageProfileComponent implements OnInit {

  userImage: string | ArrayBuffer;
  changeImage: FormGroup;
  usuarioId: number;
  imageLoaded: boolean = false;
  currentUser: Usuario;
  startUpload: boolean = false;
  percent: number;
  imageToUpload: ImagenUsuario;
  imageSelected: any;
  headerTitle: string;

  constructor(
    private title: Title,
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected uploadService: ImagenesUsuarioService,
    protected router: Router,
    protected actRoute: ActivatedRoute,
    private alertService: AlertsService,
    protected imagenService: CambioImagenService,
    private http: HttpClient
  ) {
    this.changeImage = this.fb.group({
      image: ['']
    });

    this.currentUser = new Usuario;
    this.currentUser = this.authService.getCurrentUser();

    console.log(this.currentUser);

    if (this.currentUser.imagenes_usuario) {
      this.userImage = imageSrv + '/' +  this.currentUser.imagenes_usuario.dir + '/' + this.currentUser.imagenes_usuario.nombre;
    } else { 
      this.userImage = DEFAULT_IMAGE;
    }

    this.usuarioId = parseInt(this.actRoute.snapshot.paramMap.get('id'));

    if (this.currentUser.id !== this.usuarioId) {
      this.router.navigate([`usuarios/cambiar-imagen/${this.currentUser.id}`], { replaceUrl: true });
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Cambiar imágen de perfil');
    this.percent = 0;
  }

  imageInputChange(fileInputEvent: any) { 
    this.imageSelected = (fileInputEvent.target as HTMLInputElement).files[0];

    var mimeType = this.imageSelected.type;

    if (mimeType.match(/image\/*/) == null) {
      this.alertService.createMessage('error', `¡Solo se permiten imágenes!`, 10000);
      return;
    }

    this.imageToUpload = new ImagenUsuario;

    this.imageToUpload.usuario_id = this.currentUser.id;
    this.imageToUpload.nombre = this.imageSelected.name;
    this.imageToUpload.size = this.imageSelected.size;
    this.imageToUpload.mime = this.imageSelected.type.split("/")[1];

    var reader = new FileReader();
    reader.readAsDataURL(this.imageSelected); 
    reader.onload = (_event) => { 
      this.userImage = reader.result;
      this.imageToUpload.file = this.userImage;
    }

    this.imageLoaded = true;
  }

  uploadImage() {
    try {
      this.startUpload = true;

      this.uploadService.uploadImage(this.imageToUpload).subscribe(event => { 
        if (event.type === HttpEventType.UploadProgress) {
          this.percent = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.reloadData(event.body.imagenesUsuario);
          this.alertService.createMessage('success', `La imágen de perfil se actualizó correctamente`, 10000);
          this.startUpload = false;
          this.imageLoaded = false;
        }
      }); 
    } catch (error) {
      this.imageLoaded = false;
      this.startUpload = false; 
    }
  }

  reloadData(data): void { 
    localStorage.removeItem('current_user');
    this.currentUser.imagenes_usuario = new ImagenUsuario();
    this.currentUser.imagenes_usuario = data;
    localStorage.setItem('current_user', JSON.stringify(this.currentUser));

    this.imagenService.changeImageDir(this.currentUser.imagenes_usuario);
  }
}
