import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';


import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AccountsetPage } from '../accountset/accountset';
import { WelcomePage } from '../welcome/welcome';




@IonicPage()
@Component({
  selector: 'page-healthstatus',
  templateUrl: 'healthstatus.html',
})
export class HealthstatusPage {

  heartratedeg: any;
  temperaturedeg: any;

  temperatureData: any = [];
  heartrateData: any = [];


  infantinfo2 = { "id": "", "name": "", "age": "", "cradle": "" };
  constructor(public navParams: NavParams, public toastCtrl: ToastController, public menuCtrl: MenuController, public authServiceProvider: AuthServiceProvider, public nav: NavController, public alertCtrl: AlertController) {

    //console.log("watt");
    this.infantinfo2 = JSON.parse(localStorage.getItem('infinfo'));
    console.log(this.infantinfo2);
    this.getheartrate();
    this.gettemperature();

  }

  ionViewDidEnter() {
    this.infantinfo2 = JSON.parse(localStorage.getItem('infinfo'));
    console.log(this.infantinfo2);
    this.getheartrate();
    this.gettemperature();
  }


  getheartrate() {
    this.authServiceProvider.postData(this.infantinfo2, 'getheartrate')
      .then((result) => {
        this.heartratedeg = result;
        if (this.heartratedeg.heartratedegree) {
          this.heartrateData = this.heartratedeg.heartratedegree;
          console.log(this.heartrateData);
        } else {
          console.log("Not Assigned");


        }
      }, (err) => {

      });

  }


  gettemperature() {
    this.authServiceProvider.postData(this.infantinfo2, 'gettemperature')
      .then((result) => {
        this.temperaturedeg = result;
        if (this.temperaturedeg.temperaturedegree) {
          this.temperatureData = this.temperaturedeg.temperaturedegree;
          console.log(this.temperatureData);
        } else {
          console.log("Not Assigned");


        }
      }, (err) => {

      });

  }




}
