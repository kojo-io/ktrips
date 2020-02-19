import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../search/search.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {readStringArrayType} from '@angular/compiler-cli/src/ngtsc/metadata/src/util';
import {Router} from '@angular/router';
import {BaseService} from '../utilities/base.service';
import {PhoneVerifyComponent} from "../phone-verify/phone-verify.component";
import {ReceiptComponent} from "../receipt/receipt.component";

@Component({
  selector: 'app-selected-seats',
  templateUrl: './selected-seats.component.html',
  styleUrls: ['./selected-seats.component.scss'],
})
export class SelectedSeatsComponent implements OnInit {

  @Input() SelectedSeats: any[];
  @Input() BusId: any;
  @Input() CompanyId: any;
  @Input() Bus: any;
  @Input() complete: any;
  editCache = {};
  AllRoutes: any[];
  BookObject: Array<any> = [];
  offline = false;
  constructor(private searchService: SearchService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private baseService: BaseService,
              public modalController: ModalController,
              private router: Router) {
    this.baseService.CanExist(false);
    this.baseService.completed.subscribe(
        async result => {
          this.complete = result;

          if (this.complete === true) {
            await this.modalController.dismiss();
          }
        }
    );

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

  ngOnInit() {
    this.SelectedSeats = this.baseService.getsessions('seatresults').SelectedSeats;
    this.BusId = this.baseService.getsessions('seatresults').BusId;
    this.CompanyId = this.baseService.getsessions('seatresults').CompanyId;
    this.Bus = this.baseService.getsessions('seatresults').Bus;

    this.GetRoutePoints();
    this.SelectedSeats.forEach((value) => {
      value.Name = `${this.baseService.getUserData().firstName} ${this.baseService.getUserData().lastName}`;
      value.Email = this.baseService.getUserData().email;
      value.Phone = this.baseService.getUserData().contact;
      this.editCache[value.seatcode] = {
        edit: false,
        data : {
          PickupPointId: 0,
          DropOffPoint: 0,
          pickup: '',
          dropoff: '',
          Name: `${this.baseService.getUserData().firstName} ${this.baseService.getUserData().lastName}`,
          Email: this.baseService.getUserData().email,
          Phone: this.baseService.getUserData().contact
        }
      };
    });
  }

  async dismiss() {
    await this.router.navigate(['/single-result']);
    this.baseService.clearsessions('seatresults');
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  saveEdit(key: string): void {
    const index = this.SelectedSeats.findIndex(data => data.seatcode === key);
    this.SelectedSeats[index].Phone = this.editCache[key].data.Phone;
    this.SelectedSeats[index].Email = this.editCache[key].data.Email;
    this.SelectedSeats[index].DropOffPoint = this.editCache[key].data.DropOffPoint;
    this.SelectedSeats[index].PickupPointId = this.editCache[key].data.PickupPointId;
    this.SelectedSeats[index].Name = this.editCache[key].data.Name;
    this.editCache[key].edit = false;
    console.log(this.SelectedSeats);
    if (this.editCache[key].data.DropOffPoint) {
      this.SelectedSeats[index].DropPoint = this.AllRoutes.find(u => u.id === this.editCache[key].data.DropOffPoint).name;
    }

    if (this.editCache[key].data.PickupPointId) {
      this.SelectedSeats[index].PickupPoint = this.AllRoutes.find(u => u.id === this.editCache[key].data.PickupPointId).name;
    }
  }

  cancelEdit(key: string): void {
    const index = this.SelectedSeats.findIndex(data => data.seatcode === key);
    this.editCache[key] = {
      data: this.SelectedSeats[index],
      edit: false
    };
  }

  GetRoutePoints(): void {
    this.searchService.GetRoutePoints(this.BusId, this.CompanyId).subscribe(
        result => {
          this.AllRoutes = result.data;
          console.log(this.AllRoutes);
        }
    );
  }

  async BookSeat(): Promise<void> {
    this.BookObject = [];
    this.SelectedSeats.forEach(
        ticket => {
          this.BookObject.push({
            stationId: this.Bus.station.id,
            busId: this.Bus.id,
            seatCode: ticket.seatcode,
            bookCode: ticket.bookcode,
            busBookStateId: this.Bus.busBookStateId,
            dateOnTicket: this.Bus.departureTime,
            companyId: this.Bus.company.id,
            pickupPointId: ticket.PickupPointId,
            dropOffPoint: ticket.DropOffPoint,
            name: ticket.Name,
            email: ticket.Email,
            phone: ticket.Phone,
            busTripId: this.Bus.bustrip,
          });
        }
    );

    const receipt = {
      company: this.Bus.company,
      bus: this.Bus.numberPlate,
      type: this.Bus.busType,
      seats: this.BookObject
    };

    const modal = await this.modalController.create({
      component: ReceiptComponent,
      componentProps: {
        receipt
      }
    });
    await modal.present();
  }

  async checkOut() {
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
    });
    await loading.present();
    this.searchService.PostBook(this.BookObject).subscribe(
        async result => {
          if (result.status === 201) {
            const alert = await this.alertController.create({
              header: 'Error',
              message: result.message,
              buttons: ['OK']
            });
            await loading.dismiss();
            await alert.present();
          }

          if (result.status === 103) {
            const alert = await this.alertController.create({
              header: 'Error',
              message: result.message[0].description,
              buttons: ['OK']
            });
            await loading.dismiss();
            await alert.present();
          }

          if (result.status === 301) {
            const alert = await this.alertController.create({
              header: 'Error',
              subHeader: 'Booking Error',
              message: result.message,
              buttons: ['OK']
            });
            await loading.dismiss();
            await alert.present();
          }

          if (result.status === 500) {
            const alert = await this.alertController.create({
              header: 'Error',
              message: result.message,
              buttons: ['OK']
            });
            await loading.dismiss();
            await alert.present();
          }

          if (result.status === 100) {
            const alert = await this.alertController.create({
              header: 'Success',
              message: result.message,
              buttons: ['OK']
            });
            await loading.dismiss();
            await alert.present();
            this.baseService.IsCompleted(true);
            await this.router.navigate(['/tabs/search']);
          }
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.message,
            buttons: ['OK']
          });
          await loading.dismiss();
          await alert.present();
        }
    );
  }
}
