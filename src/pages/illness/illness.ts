import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html',
})
export class IllnessPage {

  infDetails: any;

  inserted: any;

  insertedData: any = [];

  medicinedata = {
    "medicine_name": "", "total_ML": "", "dose_ML": "", "morning": "no", "afternoon": "no", "evening": "no",
    "id": "", "cradle": ""
  };

  infantinfo2 = { "id": "", "name": "", "age": "", "cradle": "" };


  constructor(public navCtrl: NavController, public navParams: NavParams, public authServiceProvider: AuthServiceProvider) {
    this.getinfinfo();

  }

  ionViewDidEnter() {
    this.getinfinfo();

  }


  getinfinfo() {
    this.infantinfo2 = JSON.parse(localStorage.getItem('infinfo'));
    this.medicinedata.id = this.infantinfo2.id;
    this.medicinedata.cradle = this.infantinfo2.cradle;
    //console.log(this.medicinedata);
  }

  addMedicine() {
    console.log(this.medicinedata);
    this.authServiceProvider.postData(this.medicinedata, 'insertmedicine')
      .then((result) => {
        this.inserted = result;
        if (this.inserted.insertmedicine) {
          this.insertedData.unshift(this.inserted.insertmedicine);
          console.log(this.insertedData);
        } else {
          console.log("cannot be added right now try later");
        }
      }, (err) => {

      });

  }


}
