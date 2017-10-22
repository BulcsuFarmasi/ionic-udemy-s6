import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, LoadingController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor (private authService:AuthService,
               private loadingController:LoadingController,
               private alertController:AlertController) {}

  onSignin (form:NgForm) {
      const loading = this.loadingController.create({
          content: 'Signing you in...'
      })
      loading.present();
      this.authService.signin(form.value.email, form.value.password)
          .then(data => {
              loading.dismiss();
          })
          .catch(error => {
             loading.dismiss();
             const alert = this.alertController.create({
                 title: 'Signin falied!',
                 message: error.message,
                 buttons: ['Ok']
             });
             alert.present()
          })
  }

}
