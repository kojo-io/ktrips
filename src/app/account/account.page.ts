import { Component, OnInit } from '@angular/core';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
      private router: Router,
      private baseService: BaseService,
      public modalController: ModalController
  ) {
      this.baseService.check().subscribe(
          async response =>{
              if(response.status !== 100) {
                  this.baseService.logout();
                  localStorage.removeItem('ustripsession');
                  const modal = await this.modalController.create({
                      component: LoginComponent
                  });
                  await modal.present();
              }
          }
      )
  }

  ngOnInit() {
  }

  logout(): void {
    this.baseService.logout().subscribe(
        result => {
          if (result.status === 105) {
              this.baseService.clearSessionData();
            this.router.navigate(['/']);
          }
        }
    );
  }
}
