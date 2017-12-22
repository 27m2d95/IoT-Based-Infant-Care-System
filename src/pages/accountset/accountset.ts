import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-accountset',
  templateUrl: 'accountset.html',
})
export class AccountsetPage {

  useraccDetails: any;
  responseData: any;
  dataSet: any = [];

  //useraccPostData = { "username": "", "token": "", "email": "" };
  useraccPostData = { "username": "", "token": "", "email": "", "password": "" };


  constructor(public menuCtrl: MenuController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.useraccDetails = data.userData;

    this.useraccPostData.username = this.useraccDetails.user_name;
    this.useraccPostData.token = this.useraccDetails.token;
    this.useraccPostData.password = this.useraccDetails.user_password;


    console.log(this.useraccPostData);

    this.getuserinfo();
  }

  getuserinfo() {
    this.authServiceProvider.postData(this.useraccPostData, 'userinfoview')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.feedData) {
          this.dataSet = this.responseData.feedData;
          console.log(this.dataSet);
        } else {
          console.log("No info");
        }
      }, (err) => {

      });
  }

  updateemail() {
    let prompt = this.alertCtrl.create({
      title: 'Update Email',
      message: "Please Enter The New Email",
      inputs: [
        {
          name: 'newemail',
          placeholder: 'New Email',
          type: "email",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.useraccPostData.email = data.newemail;

            if (this.useraccPostData.email != "") {
              this.authServiceProvider.postData(this.useraccPostData, 'updateemail')
                .then((result) => {
                  this.responseData = result;
                  if (this.responseData.feedData) {
                    this.presentLoading();
                    this.dataSet = [];
                    this.dataSet.unshift(this.responseData.feedData);
                    console.log(this.dataSet);
                    setTimeout(() => this.presentToast1("Updated Successfully"), 2000);

                  } else {
                    this.presentToast1("cannot be updated");
                  }
                }, (err) => {

                });
            } else {
              this.presentToast1("please fill in the email");
            }

          }
        }
      ]
    });
    prompt.present();
  }


  updatepassword() {
    let prompt = this.alertCtrl.create({
      title: 'Update Password',
      message: "Please Enter The New password",
      inputs: [
        {
          name: 'curpassword',
          placeholder: 'Current Password',
          type: "password"
        },
        {
          name: 'newpassword',
          placeholder: 'New Password',
          type: "password"
        },
        {
          name: 'confnewpassword',
          placeholder: 'Confirm New Passwprd',
          type: "password"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {

            if (data.curpassword !="" &&  data.newpassword != "" && data.confnewpassword != "") {
              if (data.curpassword != this.useraccPostData.password) {
                // if (this.useraccPostData.password == data.curpassword) {
                if (data.newpassword == data.confnewpassword) {
                  this.useraccPostData.password = data.newpassword;
                  this.authServiceProvider.postData(this.useraccPostData, 'updatepassword')
                    .then((result) => {
                      this.responseData = result;
                      if (this.responseData.feedData) {
                        this.presentLoading();
                        this.dataSet = [];
                        this.dataSet.unshift(this.responseData.feedData);
                        console.log(this.dataSet);
                      } else {
                        this.presentToast1("cannot be updated");
                      }
                    }, (err) => {

                    });

                } else {
                  this.presentToast1("The New Passwords are unmatched");
                }

                // } else {
                //   this.presentToast1("The Current Password is incorrect");
                // }
              } else {
                this.presentToast1("Cannot Enter the Old Password Again");
              }

            } else {
              
              this.presentToast1("Please Fill in The Required Info");
            }
          }
        }
      ]
    });
    prompt.present();

  }

  deleteaccount() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Do You Want To Delete Your Account?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authServiceProvider.postData(this.useraccPostData, 'deleteaccount')
              .then((result) => {
                this.responseData = result;
                //if (this.responseData.feedData) {
                this.presentLoading();
                this.dataSet = [];
                this.dataSet.unshift(this.responseData.feedData);
                console.log(this.dataSet);
                setTimeout(() => this.presentToast1("Deleted Successfully"), 2000);
                setTimeout(() => this.logout1(), 4000);
                // } else {
                //   this.presentToast1("cannot be Deleted");
                // }
              }, (err) => {

              });

          }
        }
      ]
    });
    confirm.present();
  }


  presentToast1(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }

  logout1() {
    this.menuCtrl.close();
    localStorage.clear();
    //this.backToWelcome();
    //setTimeout(() => this.backToWelcome(), 1000);
    window.location.reload();
  }

}



