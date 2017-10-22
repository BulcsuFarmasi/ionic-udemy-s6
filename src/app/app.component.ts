import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  isAuthenticated = false;
  signinPage = SigninPage;
  signupPage = SignupPage;
  rootPage:any = TabsPage;
  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuController:MenuController, private authService:AuthService) {
    firebase.initializeApp({
        apiKey: 'AIzaSyAinpZUmMQlkO-zlZaqutHNxoc_XZmOuvo',
        authDomain: 'ionic-recipe-book-15ab7.firebaseapp.com'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.isAuthenticated = true;
          this.rootPage = TabsPage;
      } else {
         this.isAuthenticated = false;
         this.rootPage = SigninPage;
      }

    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    onLoad (page:any) {
        this.nav.setRoot(page);
        this.menuController.close();
    }

    onLogout () {
        this.authService.logout()
        this.menuController.close();
        this.nav.setRoot(SigninPage);
    }

}

