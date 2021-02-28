import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationModule } from './navigation/navigation.module';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', loadChildren: () => import('./auth-login/auth-login.module').then(m => m.AuthLoginModule) },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NavigationModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppRoutingModule { }
