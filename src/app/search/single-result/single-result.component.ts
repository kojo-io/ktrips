import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SelectedSeatsComponent} from '../selected-seats/selected-seats.component';
import {BaseService} from '../../utilities/base.service';
import {SearchService} from '../search.service';
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
  constructor(public modalController: ModalController,
              private searchService: SearchService,
              private router: Router,
              private baseService: BaseService) {
    this.baseService.completed.subscribe(
        async result => {
          this.complete = result;

          if (this.complete === true) {
            await this.modalController.dismiss();
          }
        }
    );
  }

  ngOnInit() {
    this.AvailableBus = this.baseService.getsessions('sresults').AvailableBus;
    this.GetTickets();
  }

  GetAvailable(data): void {
    this.AvailableBus = data;
    this.SetSeat(this.AvailableBus);
    this.stationInfo = data.from;
    this.todestination = data.to;
    this.currentDate = new Date();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  GetTickets(): void {
    this.searchService.GetTickets(this.AvailableBus.busBookStateId).subscribe(
        result => {
          this.AllTickets = result;
          this.GetAvailable(this.AvailableBus);
          console.log('tickets', this.AllTickets);
        }
    );
  }

  formatBookCode(value: Date, seatcode): any {
    return  `${value.getFullYear()}${value.getMonth() + 1}${value.getDate()}${value.getHours()}${value.getMinutes()}-${seatcode}`;
  }

  formatDate(value: Date): any {
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }

  public ALeftNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `W${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `W${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.LeftSeats.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 1) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked k', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.LeftSeats.push({seatcode: `${position}${count + 1}`, color, index, disabled});
    }
  }

  public ARightNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (index === 1) {
      const found = data.bookedSeats.find(u => u.seatCode === `W${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `W${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked l', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.RightSeats.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked m', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.RightSeats.push({seatcode: `${position}${count + 1}`, color, index, disabled});
    }
  }

  public BackNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (index === 1) {
      const found = data.bookedSeats.find(u => u.seatCode === `W${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `W${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked 4', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.backSeat.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count + 1}`);
        disabled = true;
        if (booked) {
          console.log('booked 5', booked);
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
      this.backSeat.push({seatcode: `${position}${count + 1}`, color, index, disabled});
    }
  }

  SelectSeat(seatcode, position): void {
    this.currentDate = new Date();
    console.log(seatcode);
    const getcode = this.SelectedTickets.find(u => u.seatcode === seatcode && u.state === 'new');
    console.log(getcode);
    if (!getcode) {
      this.SelectedTickets.push(
          {
            seatcode,
            state: 'new',
            bookcode: this.formatBookCode(this.currentDate, seatcode),
            date: this.currentDate,
            formateddate: this.formatDate(this.currentDate),
            PickupPointId: 0,
            DropOffPoint: 0,
            PickupPoint: '',
            DropPoint: '',
            Name: '',
            Email: '',
            Phone: ''
          });
      // this.editCache[seatcode] = {
      //   edit: false,
      //   data : {
      //     PickupPointId: 0,
      //     DropOffPoint: 0,
      //     pickup: '',
      //     dropoff: '',
      //     Name: '',
      //     Email: '',
      //     Phone: ''
      //   }
      // };
      if (position === 'Left') {
        this.LeftSeats.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      if (position === 'Right') {
        this.RightSeats.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      if (position === 'Back') {
        this.backSeat.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      this.totalprice = this.totalprice + this.AvailableBus.price;
    } else {
      // this.editCache[seatcode] = {};
      this.SelectedTickets.splice(
          this.SelectedTickets.indexOf(
              this.SelectedTickets.find(u => u.seatcode === seatcode && u.state === 'new')), 1);
      if (position === 'Left') {
        this.LeftSeats.find(u => u.seatcode === seatcode).color = 'white';
      }
      if (position === 'Right') {
        this.RightSeats.find(u => u.seatcode === seatcode).color = 'white';
      }
      if (position === 'Back') {
        this.backSeat.find(u => u.seatcode === seatcode).color = 'white';
      }


      this.totalprice = this.totalprice - this.AvailableBus.price;
    }
    console.log(this.SelectedTickets);
  }

  SetSeat(data): void {
    console.log(data);
    this.LcolNo = data.busSetup.leftColumnNumberOfSeatsPerRow;
    this.LcolSeatsNo = data.busSetup.leftColumnNumberOfSeats;
    this.RcolNo = data.busSetup.rightColumnNumberOfSeatsPerRow;
    this.RcolSeatsNo = data.busSetup.rightColumnNumberOfSeats;
    const back = data.busSetup.backRowNumberOfSeats;
    this.LeftSeats = [];
    this.RightSeats = [];
    this.backSeat = [];

    this.TotalSeats = this.LcolSeatsNo + this.RcolSeatsNo + back;


    this.leftColumnNumberOfSeatsPerRow = new Array(this.LcolNo);
    this.Lcol = 12 / this.LcolNo;
    this.leftColumnNumberOfSeats = new Array(this.LcolSeatsNo / this.LcolNo);
    this.LcolSeats = this.LcolSeatsNo / this.LcolNo;

    for (let i = 0; i < this.leftColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.leftColumnNumberOfSeats.length; count++) {
        this.ALeftNumberSeat(i, count, 'L', data);
      }
    }

    this.rightColumnNumberOfSeatsPerRow = new Array(this.RcolNo);
    this.Rcol = 12 / this.RcolNo;
    this.rightColumnNumberOfSeats = new Array(this.RcolSeatsNo / this.RcolNo);
    this.RcolSeats = this.RcolSeatsNo / this.RcolNo;

    for (let i = 0; i < this.rightColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.rightColumnNumberOfSeats.length; count++) {
        this.ARightNumberSeat(i, count, 'R', data);
      }
    }

    this.backRowNumberOfSeats = new Array(back);
    for (let i = 0; i < this.backRowNumberOfSeats.length; i++) {
      this.BackNumberSeat(0, i, 'B', data);
    }

    console.log(this.LeftSeats, this.RightSeats, this.backSeat);
  }

  async openBus() {
    this.baseService.setsessions('seatresults', {
      SelectedSeats: this.SelectedTickets,
      BusId: this.AvailableBus.id,
      CompanyId: this.AvailableBus.company.id,
      Bus: this.AvailableBus
    });
    await this.router.navigate(['/tabs/search/selected-seats']);
    // const modal = await this.modalController.create({
    //   component: SelectedSeatsComponent,
    //   componentProps: {
    //     SelectedSeats: this.SelectedTickets,
    //     BusId: this.AvailableBus.id,
    //     CompanyId: this.AvailableBus.company.id,
    //     Bus: this.AvailableBus
    //   }
    // });
    // await modal.present();
  }
}
