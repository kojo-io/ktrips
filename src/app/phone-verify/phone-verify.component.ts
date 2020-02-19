import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingController, ModalController, Platform, ToastController} from "@ionic/angular";
import {BaseService} from "../utilities/base.service";
import {RegisterService} from "../register/register.service";
import {RegisterPage} from "../register/register.page";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.scss'],
})
export class PhoneVerifyComponent implements OnInit {

  loginForm: FormGroup;
  loginClick = false;
  phone: string;
  hide = true;
  hide2 = true;
  constructor(
      private router: Router,
      public loadingController: LoadingController,
      private formBuilder: FormBuilder,
      private baseService: BaseService,
      public toastController: ToastController,
      private registerService: RegisterService,
      private loginService: LoginService,
      public modalController: ModalController,
      private platform: Platform
  ) {

    this.baseService.CanExist(false);
    // this.platform.backButton.subscribe(async () => {
    //   this.modalController.dismiss()
    //   const modal = await this.modalController.create({
    //     component: LoginComponent
    //   });
    //   await modal.present();
    // });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: [this.phone, Validators.required],
      email: ['', Validators.required],
      code: [null, Validators.required]
    });
  }

  async register() {
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
      // duration: 2000
    });
    await loading.present();
    this.loginClick = true;


    const creds = this.loginForm.value;

    console.log(creds);

    this.registerService.PhoneVerify(creds).subscribe(
        async result => {
          if (result.status === 100) {
            this.loginService.login({email: this.phone}).subscribe(
                async value => {
                  if (value.status === 102) {
                    this.setUserData(value.data);
                    await loading.dismiss();
                    await this.router.navigate(['/tabs']);
                    await this.modalController.dismiss();
                  } else {
                    const toast = await this.toastController.create({
                      message: JSON.stringify(result.message),
                      duration: 5000
                    });
                    await loading.dismiss();
                    await toast.present();
                  }
                }
            )
          } else {
            const toast = await this.toastController.create({
              message: JSON.stringify(result.message),
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
        },
        async error => {
          if (error.status === 500) {
            const toast = await this.toastController.create({
              message: 'email or username incorrect',
              duration: 5000
            });
            await toast.present();
            await loading.dismiss();
          } else {
            const toast = await this.toastController.create({
              message: 'check your connection and try again',
              duration: 5000
            });
            await toast.present();
            await loading.dismiss();
          }
        }
    );
  }

  setUserData(result: any): void {
    console.log(result);
    this.baseService.setSessionData(result);
  }

  async login() {
    this.modalController.dismiss().then();
    this.router.navigate(['/login']);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
