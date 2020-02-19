import {AfterContentInit, Component, OnInit} from '@angular/core';
import {BaseService} from '../utilities/base.service';
import {BookingService} from './booking.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {SingleResultComponent} from '../single-result/single-result.component';
import {TicketdComponent} from './ticketd/ticketd.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, AfterContentInit {
  AllTickets: Array<any> = [];
  AllCancelledTickets: Array<any> = [];
  offline = false;
  constructor(
      private baseService: BaseService,
      private bookingService: BookingService,
      public loadingController: LoadingController,
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

  async ngOnInit() {

  }

  async loader(event) {
    this.GetBookedTickets();
    this.GetCancelledTickets();
    setTimeout(async () => {
      event.target.complete();
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

  async ngAfterContentInit() {
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
}
