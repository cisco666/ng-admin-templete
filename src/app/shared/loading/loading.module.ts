import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { NgZorroModule } from 'src/app/shared/ng-zorro/ng-zorro.module';
import { IconsProviderModule } from 'src/app/icons-provider.module';

const zorro = [
  NgZorroModule,
  IconsProviderModule
];

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    zorro
  ],
  exports: [LoadingComponent]
})
export class LoadingModule { }
