import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingModule } from 'src/app/shared/loading/loading.module';

import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    NgZorroModule,
    IconsProviderModule
  ]
})
export class ChangePasswordModule { }
