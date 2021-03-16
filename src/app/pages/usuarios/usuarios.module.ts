import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [UsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgZorroModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    SearchModule
  ]
})
export class UsuariosModule { }
