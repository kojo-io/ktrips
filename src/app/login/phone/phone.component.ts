import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController, ModalController, Platform, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../../utilities/base.service";
import {LoginService} from "../login.service";
import {LoginComponent} from "../login.component";

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {
  loginForm: FormGroup;
  loginClick = false;
  hide = true;
  @Input() connection: any;
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
    this.baseService.CanExist(false);
    // this.platform.backButton.subscribe(async () => {
    //   this.modalController.dismiss()
    //   const modal = await this.modalController.create({
    //     component: LoginComponent
    //   });
    //   await modal.present();
    // });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      contact: [null, Validators.required]
    });
  }

  async pinLogin() {
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

  async phone() {
    this.modalController.dismiss().then();
    // const modal = await this.modalController.create({
    //   component: LoginComponent
    // });
    // await modal.present();
    this.router.navigate(['/login']);
  }
}
