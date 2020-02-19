import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SeatsetupComponent} from './components/seatsetup/seatsetup.component';
import {KzCalendarComponent} from "./components/kz-calendar/kz-calendar.component";
import {KzDateComponent} from "./components/kz-date/kz-date.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [SeatsetupComponent, KzCalendarComponent, KzDateComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
  ],
  exports: [SeatsetupComponent, KzDateComponent, KzCalendarComponent]
})
export class SharedModule { }
