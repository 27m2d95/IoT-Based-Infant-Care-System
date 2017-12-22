import { Component } from '@angular/core';

import { HealthstatusPage } from '../healthstatus/healthstatus';
import { WatchPage } from '../watch/watch';
import { NotificationsPage } from '../notifications/notifications';
import { IllnessPage } from '../illness/illness';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';
import { NavController, App, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AccountsetPage } from '../accountset/accountset';
import { WelcomePage } from '../welcome/welcome';






@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  userDetails: any;

  responseData: any;
  responseData1: any;
  responseData3: any;


  dataSet: any = [];
  dataSet1: any = [];
  dataSet3: any = [];

  infantname: string = "";
  infantname1: string = "";

  userPostData = { "username": "", "token": "", "inf_name": "", "inf_age": "", "infant_id": "", "product_ID": "" };
  infantinfo = { "id": "", "name": "", "age": "", "cradle": "" };



  heartrate_t: any;
  temperature_t: any;
  weight_t: any;
  sound_t: any;

  tab1Root = HomePage;
  tab2Root = HealthstatusPage;
  tab3Root = WatchPage;
  tab4Root = IllnessPage;
  tab5Root = NotificationsPage;


  home:HomePage = new HomePage(this.toastCtrl,this.alertCtrl, this.navParams, this.nav,  this.authServiceProvider);

  constructor(public navParams: NavParams, public toastCtrl: ToastController, public app: App, public menuCtrl: MenuController, public authServiceProvider: AuthServiceProvider, public nav: NavController, public alertCtrl: AlertController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.username = this.userDetails.user_name;
    this.userPostData.token = this.userDetails.token;
    
    this.getInfant();
    localStorage.setItem('infinfo', JSON.stringify(this.infantinfo));
    
  }

  getInfant() {
    this.authServiceProvider.postData(this.userPostData, 'viewinfant')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.feedData) {
          this.dataSet = this.responseData.feedData;
          console.log(this.dataSet);
        } else {
          console.log("No Infant");
        }
      }, (err) => {

      });
  }



  logout() {
    this.menuCtrl.close();
    localStorage.clear();
    window.location.reload();
  }

  selectedInfant() {
    this.menuCtrl.close();
    this.infantinfo.id = this.infantname;
    this.authServiceProvider.postData(this.infantinfo, 'getcradleid')
      .then((result) => {
        this.responseData3 = result;
        if (this.responseData3.feedData3) {
          this.dataSet3 = this.responseData3.feedData3;
          for (let i = 0; i < this.dataSet.length; i++) {
            if (this.infantinfo.id == this.dataSet[i].infant_ID) {
              this.infantinfo.age = this.dataSet[i].date_of_birth;
              this.infantinfo.name = this.dataSet[i].infant_name;
            }
          }
          this.infantinfo.cradle = this.dataSet3[0].product_ID;
          localStorage.setItem('infinfo', JSON.stringify(this.infantinfo));
          console.log(this.dataSet3);
        } else {
          for (let i = 0; i < this.dataSet.length; i++) {
            if (this.infantinfo.id == this.dataSet[i].infant_ID) {
              this.infantinfo.age = this.dataSet[i].date_of_birth;
              this.infantinfo.name = this.dataSet[i].infant_name;
              this.infantinfo.cradle = "not assigned";
            }
          }
          localStorage.setItem('infinfo', JSON.stringify(this.infantinfo));

        }
      }, (err) => {

      });
      this.home.ionViewDidEnter();
  }

  addinfant() {
    let prompt = this.alertCtrl.create({
      title: 'Add Infant',
      message: "Please Provide Information",
      inputs: [
        {
          name: 'infname',
          placeholder: 'infant name',
          type: 'text'
        },
        {
          name: 'dob',
          placeholder: 'DOB',
          type: 'date'

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.infname != "" && data.infdob != "") {
              this.userPostData.inf_name = data.infname;
              this.userPostData.inf_age = data.dob;
              console.log(this.userPostData);

              this.authServiceProvider.postData(this.userPostData, 'addinfant')
                .then((result) => {
                  this.responseData = result;
                  if (this.responseData.feedData) {
                    //this.dataSet = undefined;
                    this.dataSet.unshift(this.responseData.feedData);
                    this.presentToast("Added successfully");
                    this.getInfant();
                  } else {
                    //console.log("No access");
                    this.presentToast("cannot be added right now try later");
                  }
                }, (err) => {

                });
            } else {
              this.presentToast("please fill in first");
            }
          }
        }
      ]
    });
    prompt.present();
  }


  updateinfant() {
    let prompt = this.alertCtrl.create({
      title: 'update Infant',
      message: "Please Provide Information",
      inputs: [
        {
          name: 'newinfname',
          placeholder: ' new infant name',
          type: 'text',
          value:this.infantinfo.name
        },
        {
          name: 'newdob',
          placeholder: ' new DOB',
          type: 'date',
          value:this.infantinfo.age
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'update',
          handler: data => {
            this.userPostData.infant_id = this.infantname;

            if (this.userPostData.infant_id != "") {
              if (data.newinfname != "" && data.newinfdob != "") {
                this.userPostData.inf_name = data.newinfname;
                this.userPostData.inf_age = data.newdob;
                console.log(this.userPostData);

                this.authServiceProvider.postData(this.userPostData, 'updateinfant')
                  .then((result) => {
                    this.responseData = result;
                    if (this.responseData.feedData) {
                      this.dataSet.unshift(this.responseData.feedData);
                      this.presentToast("updated successfully");
                      this.getInfant();
                    } else {
                      //console.log("No access");
                      this.presentToast("cannot be updated right now try later");
                    }
                  }, (err) => {

                  });
              } else {
                this.presentToast("please fill in first");
              }
            } else {
              this.presentToast("please choose avalid infant");
            }

          }
        }
      ]
    });
    prompt.present();
  }

  deleteinfant() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Confirmation',
      message: 'Delete ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.userPostData.infant_id = this.infantname;
            if (this.userPostData.infant_id != "") {
              this.authServiceProvider.postData(this.userPostData, 'deleteinfant')
                .then((result) => {
                  this.responseData = result;
                  if (this.responseData.feedData) {
                    this.dataSet.unshift(this.responseData.feedData);
                    //console.log(this.dataSet);


                  } else {
                    //console.log("No Infant");
                  }
                  this.presentToast("deleted");
                  this.getInfant();

                }, (err) => {

                });
            } else {
              this.presentToast("please choose an infnat to delete");
            }
          }
        }
      ]
    });
    confirm.present();
  }




  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  accountsetting() {
    this.nav.push(AccountsetPage);
  }

  heartrate_toggle() {
    if (this.heartrate_t) {
      console.log("heart rate clicked");
    } else {
      console.log("heart rate unclicked");

    }

  }

  temperature_toggle() {
    if (this.temperature_t) {
      console.log("temprature clicked");
    } else {
      console.log("temprature unclicked");

    }
  }


  weight_toggle() {
    if (this.weight_t) {
      console.log("weight clicked");
    } else {
      console.log("weight unclicked");

    }
  }

  sound_toggle(){
    if (this.sound_t) {
      console.log("sound clicked");
    } else {
      console.log("sound unclicked");
    }

  }

}

