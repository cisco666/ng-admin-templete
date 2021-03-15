import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'registro',
        component: UsuariosFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editar/:id',
        component: UsuariosFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cambiar-imagen/:id',
        loadChildren: () =>
          import('src/app/pages/change-image-profile/change-image-profile.module').then(
            m => m.ChangeImageProfileModule
          ),
        canActivate: [AuthGuard] 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
