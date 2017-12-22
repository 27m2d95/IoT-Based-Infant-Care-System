import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthstatusPage } from './healthstatus';

@NgModule({
  declarations: [
    HealthstatusPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthstatusPage),
  ],
})
export class HealthstatusPageModule {}
