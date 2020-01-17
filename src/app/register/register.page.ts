import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { BaseService } from '../utilities/base.service';
import { RegisterService } from './register.service';
import {LoginComponent} from '../login/login.component';

/**
 * Confirm password validator
 *
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  loginForm: FormGroup;
  loginClick = false;
  hide = true;
  hide2 = true;
  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    public toastController: ToastController,
    private registerService: RegisterService,
    public modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });

    this.loginForm.get('password').valueChanges.subscribe(() => {
      this.loginForm.get('passwordConfirm').updateValueAndValidity();
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

    this.registerService.register(creds).subscribe(
      async result => {
        if (result.status === 102) {
          this.setUserData(result);
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
  }
}


