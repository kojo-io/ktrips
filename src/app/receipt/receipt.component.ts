import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {BaseService} from "../utilities/base.service";
import {AccountService} from "../account/account.service";
import {SearchService} from "../search/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {

  receipt: any;
  Total: any;
  serviceCharge: any;
  AvailableBus: any;
  constructor(
      public alertController: AlertController,
      public loadingController: LoadingController,
      private baseService: BaseService,
      public modalController: ModalController,
      public toastController: ToastController,
      private searchService: SearchService,
      private router: Router
  ) { }

  ngOnInit() {
    this.AvailableBus = this.baseService.getsessions('sresults').AvailableBus;

    this.Total = this.AvailableBus.price * this.receipt.seats.length;
    this.serviceCharge = this.Total * 0.05;
    this.serviceCharge = parseFloat(this.serviceCharge);
    this.Total = this.Total + this.serviceCharge;
    console.log(this.receipt)
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
      // duration: 2000
    });
    await loading.present();

    const data = {
      bookings: this.receipt.seats,
      transactions: {
        amount: this.Total
      }
    };

    this.searchService.PostBook(data).subscribe(
        async result => {
          if (result.status === 100) {
            this.modalController.dismiss();
            this.baseService.clearsessions('bresults');
            this.baseService.clearsessions('sresults');
            this.baseService.clearsessions('seatresults');
            await loading.dismiss();
            await this.router.navigate(['/tabs/bookings']);
          } else {
            const toast = await this.toastController.create({
              message: JSON.stringify(result.message),
              duration: 5000
            });
            await loading.dismiss();
            await toast.present();
          }
        },
        async error => {
          if (error.status === 500) {
            const toast = await this.toastController.create({
              message: error.message,
              duration: 5000
            });
            await toast.present();
            await loading.dismiss();
          } else {
            const toast = await this.toastController.create({
              message: 'check your connection and try again',
              duration: 5000
            });
            await toast.present();
            await loading.dismiss();
          }
        }
    );
  }
}
