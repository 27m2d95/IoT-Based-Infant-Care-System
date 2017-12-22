import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchPage } from './watch';

@NgModule({
  declarations: [
    WatchPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchPage),
  ],
})
export class WatchPageModule {}
