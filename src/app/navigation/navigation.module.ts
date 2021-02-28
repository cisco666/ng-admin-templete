import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation.component';

import { NgZorroModule } from '../shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from '../icons-provider.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NavigationModule { }
