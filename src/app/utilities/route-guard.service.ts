import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {ModalController} from '@ionic/angular';
import {LoginComponent} from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    public baseService: BaseService,
    public route: Router,
    public modalController: ModalController
  ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.baseService.check().subscribe(async (response) => {
        if (response.status === 100) {
          resolve(true);
        } else {
          this.baseService.logout();
          localStorage.getItem('ustripsession');
          // this.route.navigate(['/login']);
          const modal = await this.modalController.create({
            component: LoginComponent
          });
          await modal.present();
          // resolve(false);
        }
      }, async (error) => {
        error.title = 'User check';
        // resolve(false);
        this.baseService.logout();
        localStorage.getItem('ustripsession');
        // this.route.navigate(['/login']);
        const modal = await this.modalController.create({
          component: LoginComponent
        });
        await modal.present();
        // throw (error);
      });
    });
  }
}
