import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeImageProfileRoutingModule } from './change-image-profile-routing.module';
import { ChangeImageProfileComponent } from './change-image-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';


@NgModule({
  declarations: [ChangeImageProfileComponent],
  imports: [
    CommonModule,
    ChangeImageProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
    IconsProviderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangeImageProfileModule { }
