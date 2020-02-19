import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SelectedSeatsComponent} from '../selected-seats/selected-seats.component';
import {BaseService} from '../utilities/base.service';
import {SearchService} from '../search/search.service';
import {Router} from '@angular/router';

export interface TicketSelect {
  seatcode: string;
  state: string;
  bookcode: string;
  date: any;
  formateddate: any;
  PickupPointId: any;
  DropOffPoint: any;
  PickupPoint: string;
  DropPoint: string;
  Name: string;
  Email: string;
  Phone: string;
}

export interface SeatCode {
  seatcode: string;
  color: string;
  index: number;
  disabled: boolean;
}
@Component({
  selector: 'app-single-result',
  templateUrl: './single-result.component.html',
  styleUrls: ['./single-result.component.scss'],
})
export class SingleResultComponent implements OnInit {
  @Input() AvailableBus: any;
  SelectedTickets: Array<TicketSelect> = [];
  LeftSeats: Array<SeatCode> = [];
  RightSeats: Array<SeatCode> = [];
  backSeat: Array<SeatCode> = [];
  stationInfo: any;
  todestination: any;
  currentDate: Date;
  leftColumnNumberOfSeatsPerRow = [];
  leftColumnNumberOfSeats = [];
  rightColumnNumberOfSeatsPerRow = [];
  rightColumnNumberOfSeats = [];
  backRowNumberOfSeats = [];
  Lcol: any;
  LcolNo: any;
  LcolSeats: any;
  LcolSeatsNo: any;
  Rcol: any;
  RcolNo: any;
  RcolSeats: any;
  RcolSeatsNo: any;
  TotalSeats: any;
  totalprice = 0;
  AllTickets: Array<any> = [];
  @Input() complete: any;
  offline = false;
  constructor(public modalController: ModalController,
              private searchService: SearchService,
              private router: Router,
              private baseService: BaseService) {
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
    this.AvailableBus = this.baseService.getsessions('sresults').AvailableBus;
    this.GetTickets();
  }

  async dismiss() {
    await this.router.navigate(['/tabs/search/bus-results']);
  }

  GetTickets(): void {
    this.searchService.GetTickets(this.AvailableBus.busBookStateId).subscribe(
        result => {
          this.AllTickets = result;
        }
    );
  }

  formatBookCode(value: Date, seatcode): any {
    return  `${value.getFullYear()}${value.getMonth() + 1}${value.getDate()}${value.getHours()}${value.getMinutes()}-${seatcode}`;
  }

  formatDate(value: Date): any {
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }


  GetSelectedTickets(value: Array<any>) {
    console.log('st', value)
    this.SelectedTickets = value;
  }

  async openBus() {
    this.baseService.setsessions('seatresults', {
      SelectedSeats: this.SelectedTickets,
      BusId: this.AvailableBus.id,
      CompanyId: this.AvailableBus.company.id,
      Bus: this.AvailableBus
    });
    await this.router.navigate(['/selected-seats']);
  }
}
