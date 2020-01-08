import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {TicketComponent} from './ticket/ticket.component';
import {BookingService} from '../booking.service';

@Component({
  selector: 'app-ticketd',
  templateUrl: './ticketd.component.html',
  styleUrls: ['./ticketd.component.scss'],
})
export class TicketdComponent implements OnInit {
  @Input() data: any;
  constructor(public modalController: ModalController,
              private bookingService: BookingService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController) { }

  async dismiss() {
    await this.modalController.dismiss();
  }

  ngOnInit() {
    console.log(this.data);
  }

  async openTicket(company, route, data, numberPlate) {
    const modal = await this.modalController.create({
      component: TicketComponent,
      componentProps: {
        company,
        route,
        data,
        numberPlate
      }
    });
    await modal.present();
  }

  async cancel(id) {
    const alert = await this.alertController.create({
      header: 'Ticket Cancellation ?',
      message: 'You are about to cancel a purchased ticket, This process cannot be reversed, Are you sure you want to proceed ?',
      buttons: [
        {
          text: 'YES',
          cssClass: 'primary',
          handler: () => {
            this.confirm(id);
          }
        }, {
          text: 'NO',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  async confirm(id: any) {
    const loading = await this.loadingController.create({
      message: 'please wait ...',
    });
    await loading.present();
    this.bookingService.CancelTicket(id).subscribe(
        async result => {
          if (result.status === 201) {
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000,
            });
            await toast.present();
            await loading.dismiss();
          }

          if (result.status === 103) {
            const toast = await this.toastController.create({
              message: result.message[0].description,
              duration: 5000,
            });
            await toast.present();
            await loading.dismiss();
          }

          if (result.status === 301) {
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000,
            });
            await toast.present();
            await loading.dismiss();
          }

          if (result.status === 500) {
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000,
            });
            await toast.present();
            await loading.dismiss();
          }

          if (result.status === 100) {
            const toast = await this.toastController.create({
              message: result.message,
              duration: 5000,
            });
            await toast.present();
            await loading.dismiss();
          }
        },
        async error => {
          const toast = await this.toastController.create({
            message: error.message,
            duration: 5000,
          });
          await loading.dismiss();
          await toast.present();
        }
    );
  }

  datecheck(date): boolean {
    const now = new Date();
    let value = false;
    const newdate = new Date(date);
    if (now > newdate) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }
}
