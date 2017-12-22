import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { Toast } from 'ionic-angular/components/toast/toast';
import { UrlSerializer } from 'ionic-angular/navigation/url-serializer';
import { LoginPage } from '../login/login';


import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  responseData: any;
  userData = { "username": "", "password": "", "confpassword": "", "email": "" };
  user: FormGroup;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public authServiceProvider: AuthServiceProvider) {
  }

  ngOnInit() {

    this.user = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

  }

  signup() {
    //if (this.userData.username != "" && this.userData.password != "" && this.userData.confpassword != "" && this.userData.email != "") {
    if (this.userData.password == this.userData.confpassword) {
      this.authServiceProvider.postData(this.userData, 'signup').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.userData) {
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          this.navCtrl.push(TabsPage);
          this.presentToast("Welcome to Isitter");

        } else {
          this.presentToast("This user name or email are already exsist");
        }
      }, (err) => {
      });
    } else {
      this.presentToast("The Passwords are unmatched");
    }

    // } else {
    //   this.presentToast("please fill");
    // }
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
