import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroModule,
    IconsProviderModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
