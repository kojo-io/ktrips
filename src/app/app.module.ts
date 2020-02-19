import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
    MatBottomSheet,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatNativeDateModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpinterceptorService} from './utilities/httpinterceptor.service';
import {LoginComponent} from './login/login.component';
import {RegisterPage} from './register/register.page';
import {Network} from "@ionic-native/network/ngx";
import {PhoneComponent} from "./login/phone/phone.component";
import {PhoneVerifyComponent} from "./phone-verify/phone-verify.component";
import {SplashScreen} from "@ionic-native/splash-screen";
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import {BusresultsComponent} from "./busresults/busresults.component";
import {SingleResultComponent} from "./single-result/single-result.component";
import {SelectedSeatsComponent} from "./selected-seats/selected-seats.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {SharedModule} from "./Shared/shared.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterPage,
        PhoneComponent,
        PhoneVerifyComponent,
        BusresultsComponent,
        SingleResultComponent,
        SelectedSeatsComponent,
        ReceiptComponent
    ],
    entryComponents: [
        LoginComponent,
        RegisterPage,
        PhoneComponent,
        PhoneVerifyComponent,
        BusresultsComponent,
        SingleResultComponent,
        SelectedSeatsComponent,
        ReceiptComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        Network,
        Camera,
        Base64,
        File,
        Crop,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
