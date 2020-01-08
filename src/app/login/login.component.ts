import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {BaseService} from '../utilities/base.service';
import {LoginService} from './login.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {RegisterPage} from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginClick = false;
  hide = true;
  constructor(
      private router: Router,
      public loadingController: LoadingController,
      private formBuilder: FormBuilder,
      private baseService: BaseService,
      public toastController: ToastController,
      private loginService: LoginService,
      public modalController: ModalController
  ) {
    // this.statusBar.backgroundColorByName('white');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async login() {
    // this.router.navigate(['/tabs']);
    // return;
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
    });
    await loading.present();


    const creds = this.loginForm.value;
    const loginData = {
      email: creds.email,
      password: creds.password
    };

    console.log(loginData);
    this.loginService.login(loginData).subscribe(
        async result => {
          if (result.status === 102) {
            this.setUserData(result.data);
            await loading.dismiss();
            await this.router.navigate(['/tabs']);
            await this.modalController.dismiss();
          }
          if (result.status === 500) {
            // alert(result.message);
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
          if (result.status === 104) {
            // alert(result.message);
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
        },
        async error => {
          this.baseService.logout();
          const toast = await this.toastController.create({
            message: 'network error',
            duration: 5000,
          });
          await loading.dismiss();
          await toast.present();
        }
    );
  }

  setUserData(result: any): void {
    // alert(result.data.user.id);
    this.baseService.setSessionData(result);
  }

  async register() {
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    await modal.present();
  }
}
