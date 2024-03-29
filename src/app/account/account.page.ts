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
    offline = false;
    user: any;
  constructor(
      private router: Router,
      private baseService: BaseService,
      public modalController: ModalController
  ) {
      this.baseService.CanExist(false);
      this.baseService.connectionStatus.subscribe(
          async result => {
              if (!result) {
                  this.offline = true;
              } else {
                  this.offline = false;
              }
          }
      );
  }

  ngOnInit() {

  }

  logout(): void {
    this.baseService.logout().subscribe(
        result => {
          if (result.status === 105) {
              this.baseService.clearSessionData();
              this.router.navigate(['/login']);
          }
        }
    );
  }
}
