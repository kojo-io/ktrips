import { Component } from '@angular/core';

import {ModalController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {SplashPage} from './splash/splash.page';
import {ancestorWhere} from 'tslint';
import {timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }
  showSplash = true;
  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByName('white');
      this.splashScreen.hide();
      timer(5000).subscribe(() => this.showSplash = false);
      await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}
