import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData: any;
  userData = { "username": "", "password": "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider, public toastCtrl: ToastController) {
  }


  login() {
    if (this.userData.username != "" && this.userData.password != "") {
      this.authServiceProvider.postData(this.userData, 'login').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.userData) {
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.navCtrl.push(TabsPage);
        } else {
          this.presentToast("Invalid User name or Password");
        }


      }, (err) => {
      });
    } else {
      this.presentToast("please fill up the required info");
    }

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
