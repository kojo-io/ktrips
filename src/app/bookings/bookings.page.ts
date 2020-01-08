import { Component, OnInit } from '@angular/core';
import {BaseService} from '../utilities/base.service';
import {BookingService} from './booking.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {SingleResultComponent} from '../search/single-result/single-result.component';
import {TicketdComponent} from './ticketd/ticketd.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  AllTickets: Array<any> = [];
  AllCancelledTickets: Array<any> = [];
  constructor(
      private baseService: BaseService,
      private bookingService: BookingService,
      public loadingController: LoadingController,
      public modalController: ModalController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading your bookings ...',
      cssClass: 'spinner-color',
      spinner: 'bubbles'
    });
    await loading.present();
    this.GetBookedTickets();
    this.GetCancelledTickets();
    setTimeout(async () => {
      await loading.dismiss();
    }, 5000);
  }

  GetBookedTickets(): void {
    this.bookingService.GetTickets().subscribe(
        result => {
          this.AllTickets = result.data;
        }
    );
  }

  formatDate(value): any {
    value = new Date(value);
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }

  GetCancelledTickets(): void {
    this.bookingService.GetCancelTickets().subscribe(
        result => {
          this.AllCancelledTickets = result.data;
        }
    );
  }

  async openTickets(data) {
    const modal = await this.modalController.create({
      component: TicketdComponent,
      componentProps: {
        data
      }
    });
    await modal.present();
  }
}
