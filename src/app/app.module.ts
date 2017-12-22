import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { MyApp } from './app.component';


import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HealthstatusPage } from '../pages/healthstatus/healthstatus';
import { WatchPage } from '../pages/watch/watch';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NotificationsPage } from '../pages/notifications/notifications';
import { IllnessPage } from '../pages/illness/illness';
import { AccountsetPage } from '../pages/accountset/accountset';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';





import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';

const config = {
  apiKey: "AIzaSyCDP4vAgU8fEBNF3tpWSflJOyUURapA874",
  authDomain: "isitter-d6b29.firebaseapp.com",
  databaseURL: "https://isitter-d6b29.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "816212663873"
};

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    HealthstatusPage,
    WatchPage,
    HomePage,
    TabsPage,
    NotificationsPage,
    IllnessPage,
    AccountsetPage
  ],
  imports: [
    BrowserModule,HttpClientModule,HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,AngularFireAuthModule,MomentModule,LinkyModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    HealthstatusPage,
    WatchPage,
    HomePage,
    TabsPage,
    NotificationsPage,
    IllnessPage,
    AccountsetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider//,AuthService
  ]
})
export class AppModule {}
