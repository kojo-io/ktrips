import {Component, Input, QueryList, ViewChildren} from '@angular/core';

import {AlertController, IonRouterOutlet, ModalController, Platform, ToastController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {timer} from 'rxjs';
import {ConnectionService} from "ng-connection-service";
import {LoginComponent} from "./login/login.component";
import {BaseService} from "./utilities/base.service";
import {Router} from "@angular/router";
import {timeout} from "rxjs/operators";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  canExit = true;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<any>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private baseService: BaseService,
    private statusBar: StatusBar,
    private connectionService: ConnectionService,
    private screenOrientation: ScreenOrientation,
    public router: Router,
    public toastController: ToastController
  ) {
    this.baseService.CanExist(true);
    this.baseService.canExistApp.subscribe(
        result => {
          this.canExit = result;
        }
    );
    this.initializeApp();
    this.backButtonEvent();
  }
  showSplash = true;
  backbutton = 0;


  backButtonEvent() {
    this.platform.backButton.subscribe( async () => {
      if (this.canExit) {
        if (this.backbutton === 0) {
          this.backbutton ++;
          const toast = await this.toastController.create({
            message: 'press again to exit',
            duration: 3000
          });
          await toast.present();
          setTimeout(function () {
            this.backbutton = 0;
          }, 3000)
        } else {
          this.backbutton = 0;
          navigator['app'].exitApp();
        }
      }else {
        // if(this.router.url === '/tabs/search') {
        //   navigator['app'].exitApp();
        // } else {
        //
        // }
        window.history.back();
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByName('white');
      this.splashScreen.hide()
      timer(3000).subscribe(() => this.showSplash = false);
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}
