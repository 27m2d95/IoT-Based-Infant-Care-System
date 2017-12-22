import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../tabs/tabs';

import { HealthstatusPage } from '../healthstatus/healthstatus';
import { WatchPage } from '../watch/watch';
import { NotificationsPage } from '../notifications/notifications';
import { IllnessPage } from '../illness/illness';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  userDetails: any;

  responseData1: any;
  responseData: any;
  responseData2: any;

  dataSet: any = [];
  dataSet1: any = [];
  dataSet2: any = [];

  infantname1: string ="";

  infantinfo1 = { "id": "", "name": "", "age": "", "cradle": "" };
  infantinifo1_id: any = ""; 
  userPostData = { "username": "", "token": "", "inf_name": "", "inf_age": "", "infant_id": "", "product_ID": "" };
  infa = {"id":"", "cradle":""};

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public navCtrl: NavController, public authServiceProvider: AuthServiceProvider) {


    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.username = this.userDetails.user_name;
    this.userPostData.token = this.userDetails.token;
    this.getcradle();
    this.infantinfo1 = JSON.parse(localStorage.getItem('infinfo'));
  }

   ionViewDidEnter() {
    this.getcradle();
    this.infantinfo1 = JSON.parse(localStorage.getItem('infinfo'));
    console.log(this.infantinfo1);  
  }

 
  getcradle() {
    this.authServiceProvider.postData(this.userPostData, 'viewcradle')
      .then((result) => {
        this.responseData1 = result;
        if (this.responseData1.feedData1) {
          this.dataSet1 = this.responseData1.feedData1;
          console.log(this.dataSet1);
        } else {
          console.log("No cradle");
        }
      }, (err) => {

      });
  }

  addcradle() {
    let prompt = this.alertCtrl.create({
      title: 'Add Cradle',
      message: "Please Enter The Product ID",
      inputs: [
        {
          name: 'proid',
          placeholder: 'Product ID',
          type: 'number'
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
            if (data.proid != "") {
              this.userPostData.product_ID = data.proid;
              console.log(this.userPostData);

              this.authServiceProvider.postData(this.userPostData, 'addcradle')
                .then((result) => {
                  this.responseData = result;
                  if (this.responseData.feedData) {
                    this.dataSet.unshift(this.responseData.feedData);
                    this.presentToast("Added successfully");
                    this.getcradle();
                  } else {
                    this.presentToast("The Product is already in exists");
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


  selectedcradle() {

    console.log(this.infantname1);
    this.infa.cradle = this.infantname1;
    this.infa.id = this.infantinfo1.id;
    this.authServiceProvider.postData(this.infa,'assigncradle')
      .then((result) => {
        this.responseData2 = result;
        if (this.responseData2.feedData2) {
          this.dataSet2 = this.responseData2.feedData2;
          console.log(this.dataSet2);
          this.infantinfo1.cradle = this.dataSet2;
          localStorage.setItem('infinfo', JSON.stringify(this.infantinfo1));
          console.log(this.infantinfo1);

        } else {
          console.log(this.responseData2.feedData);
          let confirm = this.alertCtrl.create({
            title: 'Already assigned?',
            message: 'Do You Want To Contuniue?',
            buttons: [
              {
                text: 'Disagree',
                handler: () => {
                  //console.log('Disagree clicked');
                }
              },
              {
                text: 'Agree',
                handler: () => {
                  this.infa.cradle = this.infantname1;
                  this.infa.id = this.infantinfo1.id;
                  this.authServiceProvider.postData(this.infa, 'confirmassign')
                    .then((result) => {
                      this.responseData2 = result;
                      if (this.responseData2.feedData2) {
                        this.dataSet2 = this.responseData2.feedData2;
                        console.log(this.dataSet2);
                        this.infantinfo1.cradle = this.dataSet2;
                        localStorage.setItem('infinfo', JSON.stringify(this.infantinfo1));
                        console.log(this.infantinfo1);
                      } else {
                        console.log(this.responseData2.feedData);
                      }
                    }, (err) => {

                    });
                  }
                }
            ]
          });
          confirm.present();
        }
        
      }, (err) => {

      });

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }


}
