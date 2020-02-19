import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController, ModalController, Platform, ToastController} from '@ionic/angular';
import {BaseService} from '../utilities/base.service';
import {LoginService} from './login.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {RegisterPage} from '../register/register.page';
import {PhoneComponent} from "./phone/phone.component";
import {PhoneVerifyComponent} from "../phone-verify/phone-verify.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginClick = false;
  hide = true;
  @Input() connection: any;
  canExit: Boolean = true;
  slideOpts = {
    autoplay: true
  };
  constructor(
      private router: Router,
      public loadingController: LoadingController,
      private formBuilder: FormBuilder,
      private baseService: BaseService,
      public toastController: ToastController,
      private loginService: LoginService,
      public modalController: ModalController,
      private platform: Platform
  ) {
    // this.statusBar.backgroundColorByName('white');
    if (baseService.getSesstionData() !== false) {
       this.modalController.dismiss();
    }

    this.baseService.CanExist(true);

    this.baseService.canExistApp.subscribe(
         result => {
          this.canExit = result;
        }
    );

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.required],
      // password: ['', Validators.required]
    });
  }

  async verify(){
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
    });
    await loading.present();

    this.loginService.PhnoeCode(this.loginForm.value).subscribe(
        async value => {
          if (value.status === 100) {
            await loading.dismiss();
            const modal = await this.modalController.create({
              component: PhoneVerifyComponent,
              componentProps: {
                phone: this.loginForm.get('phone').value
              }
            });
            await modal.present();
          } else {
            const toast = await this.toastController.create({
              message: value.message,
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
        }
    )
  }


  async login() {
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
            // await this.modalController.dismiss();
          }
          if (result.status === 500) {
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
          if (result.status === 104) {
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
    this.baseService.setSessionData(result);
  }

  async register() {
    // this.modalController.dismiss().then();
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    await modal.present();
  }

  async phone() {
    // this.modalController.dismiss().then();
    const modal = await this.modalController.create({
      component: PhoneComponent
    });
    await modal.present();
  }

}
