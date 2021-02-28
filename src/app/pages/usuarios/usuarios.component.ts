import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AlertsService } from 'src/app/shared/messages/alerts.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { environment } from 'src/environments/environment';

const imageSrv = environment.imageUrl;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [AlertsService]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  imageSrv: string;
  

  constructor(
    private title: Title,
    private usuariosService: UsuariosService,
    private alertService: AlertsService
  ) {
    this.imageSrv = imageSrv;
  }

  ngOnInit(): void {
    this.title.setTitle('Usuarios');
    this.loadData(this.pageIndex, this.pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData(pageIndex, pageSize);
  }

  loadData(pageIndex: number, pageSize: number): void {
    
    this.loading = true;

    this.usuariosService
      .list(pageIndex, pageSize)
      .subscribe(res => {
        this.usuarios = res.usuarios;
        this.loading = false;
        this.total = res.paginator.count;
      });
  }

  eliminar(usuarioId: number, email: string): void {
    this.usuariosService.delete(usuarioId).subscribe(res => {
      this.alertService.createMessage('success', `El usuario ${email} se eliminó correctamente`, 5000);
      this.loadData(this.pageIndex, this.pageSize);
    });
  }

}
