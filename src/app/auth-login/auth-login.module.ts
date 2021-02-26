import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../shared/ng-zorro/ng-zorro.module';
import { AuthLoginRoutingModule } from './auth-login-routing.module';

@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
    AuthLoginRoutingModule
  ],
  exports: [AuthLoginComponent]
})
export class AuthLoginModule { }
