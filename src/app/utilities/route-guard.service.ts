import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router, CanActivate } from '@angular/router';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import {ModalController, ToastController} from '@ionic/angular';
import {Network} from "@ionic-native/network/ngx";

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    public baseService: BaseService,
    public route: Router,
    public modalController: ModalController,
    public toastController: ToastController,
    private network: Network
  ) { }

  // CheckOnline() {
  //   return merge<boolean>(
  //       fromEvent(window, 'offline').pipe(map(() => false)),
  //       fromEvent(window, 'online').pipe(map(() => true)),
  //       new Observable((sub: Observer<boolean>) => {
  //         sub.next(navigator.onLine);
  //         sub.complete();
  //       }));
  // }

  connection = true;
  setUserData(result: any): void {
    console.log(result);
    this.baseService.setSessionData(result);
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.network.onDisconnect().subscribe(() => {
        this.baseService.IsConnected(false);
      });

      this.network.onConnect().subscribe(() => {
        this.baseService.IsConnected(true);
      });

      if (this.baseService.getSesstionData() === false) {
        this.baseService.check().subscribe(async (response) => {
          if (response.status === 100) {
            this.setUserData(response.data);
            resolve(true);
          } else {
            this.baseService.logout();
            localStorage.removeItem('ustripsession');
            this.route.navigate(['/login']);
          }
        }, async (error) => {
          this.baseService.logout();
          localStorage.removeItem('ustripsession');
          this.route.navigate(['/login']);
        });
      } else {
        resolve(true);
      }
    });
  }
}
