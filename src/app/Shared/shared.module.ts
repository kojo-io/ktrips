import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SeatsetupComponent} from './components/seatsetup/seatsetup.component';



@NgModule({
  declarations: [SeatsetupComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [SeatsetupComponent]
})
export class SharedModule { }
