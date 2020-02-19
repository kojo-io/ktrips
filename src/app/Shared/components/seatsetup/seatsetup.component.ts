import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseService} from '../../../utilities/base.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SearchService} from "../../../search/search.service";
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
  selector: 'app-seatsetup',
  templateUrl: './seatsetup.component.html',
  styleUrls: ['./seatsetup.component.css']
})
export class SeatsetupComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() AllTickets: Array<any> = [];
  @Input() bookedSeats: Array<any> = [];
  @Output() tickSelect = new EventEmitter<any>();
  options = [];
  currentDate: Date;
  SelectedTickets: Array<TicketSelect> = [];
  leftColumnNumberOfSeatsPerRow = [];
  leftColumnNumberOfSeats = [];
  rightColumnNumberOfSeatsPerRow = [];
  rightColumnNumberOfSeats = [];
  backRowNumberOfSeats = [];
  frontRowNumberOfSeats = [];
  Lcol: any;
  Brow: any;
  Frow: any;
  LcolNo: any;
  LcolSeats: any;
  LcolSeatsNo: any;
  Rcol: any;
  RcolNo: any;
  RcolSeats: any;
  RcolSeatsNo: any;
  TotalSeats: any;
  totalprice = 0;
  stationInfo: any;
  todestination: any;
  LeftSeats: Array<SeatCode> = [];
  RightSeats: Array<SeatCode> = [];
  backSeat: Array<SeatCode> = [];
  frontSeat: Array<SeatCode> = [];
  constructor(
    private formbuilder: FormBuilder,
    private baseService: BaseService,
    private searchService: SearchService,
    public sanitize: DomSanitizer
  ) { }

  ngOnInit() {
    this.NewSetSeat(this.data.busSetup);
  }


  SetSeat(data): void {
    console.log('ss',data);
    let seatcount = 1;
    this.LcolNo = data.leftColumnNumberOfSeatsPerRow;
    this.LcolSeatsNo = data.leftColumnNumberOfSeats;
    this.RcolNo = data.rightColumnNumberOfSeatsPerRow;
    this.RcolSeatsNo = data.rightColumnNumberOfSeats;
    const back = data.backRowNumberOfSeats;
    const front = data.frontRowNumberOfSeats;
    this.LeftSeats = [];
    this.RightSeats = [];
    this.backSeat = [];
    this.frontSeat = [];

    this.TotalSeats = this.LcolSeatsNo + this.RcolSeatsNo + back + front;

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

    this.frontRowNumberOfSeats = new Array(front);
    for (let i = 0; i < this.frontRowNumberOfSeats.length; i++) {
      this.FrontNumberSeat(0, seatcount, 'F', data);
      seatcount ++;
    }

    for (let i = 0; i < this.leftColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.leftColumnNumberOfSeats.length; count++) {
        this.ALeftNumberSeat(i, seatcount, 'L', data);
        seatcount ++;
      }
    }

    for (let i = 0; i < this.rightColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.rightColumnNumberOfSeats.length; count++) {
        this.ARightNumberSeat(i, seatcount, 'R', data);
        seatcount ++;
      }
    }

    this.backRowNumberOfSeats = new Array(back);
    for (let i = 0; i < this.backRowNumberOfSeats.length; i++) {
      this.BackNumberSeat(0, seatcount, 'B', data);
      seatcount ++;
    }

    console.log(this.LeftSeats, this.RightSeats, this.backSeat);
  }

  NewSetSeat(data): void {
    console.log('sccn', this.AllTickets);
    let seatcount = 1;
    console.log(data);
    this.LcolNo = data.leftColumnNumberOfSeatsPerRow;
    this.LcolSeatsNo = data.leftColumnNumberOfSeats;
    this.RcolNo = data.rightColumnNumberOfSeatsPerRow;
    this.RcolSeatsNo = data.rightColumnNumberOfSeats;
    const back = data.backRowNumberOfSeats;
    const front = data.frontRowNumberOfSeats;
    this.LeftSeats = [];
    this.RightSeats = [];
    this.backSeat = [];
    this.frontSeat = [];

    this.TotalSeats = this.LcolSeatsNo + this.RcolSeatsNo + back + front;


    this.leftColumnNumberOfSeatsPerRow = new Array(this.LcolNo);
    this.Lcol = 12 / this.LcolNo;
    this.Brow = 12 / back;
    this.Frow = 12 / front;
    this.leftColumnNumberOfSeats = new Array(this.LcolSeatsNo / this.LcolNo);
    this.LcolSeats = this.LcolSeatsNo / this.LcolNo;

    this.rightColumnNumberOfSeatsPerRow = new Array(this.RcolNo);
    this.Rcol = 12 / this.RcolNo;
    this.rightColumnNumberOfSeats = new Array(this.RcolSeatsNo / this.RcolNo);
    this.RcolSeats = this.RcolSeatsNo / this.RcolNo;

    this.frontRowNumberOfSeats = new Array(front);
    for (let i = 0; i < this.frontRowNumberOfSeats.length; i++) {
      this.FrontNumberSeat(0, seatcount, 'F', data);
      seatcount ++;
    }

    for (let i = 0; i < this.leftColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.leftColumnNumberOfSeats.length; count++) {
        this.ALeftNumberSeat(i, seatcount, 'L', data);
        seatcount ++;
      }
    }

    for (let i = 0; i < this.rightColumnNumberOfSeatsPerRow.length; i++) {
      for (let count = 0; count < this.rightColumnNumberOfSeats.length; count++) {
        this.ARightNumberSeat(i, seatcount, 'R', data);
        seatcount ++;
      }
    }

    this.backRowNumberOfSeats = new Array(back);
    for (let i = 0; i < this.backRowNumberOfSeats.length; i++) {
      this.BackNumberSeat(0, seatcount, 'B', data);
      seatcount ++;
    }

    console.log('ff', this.LeftSeats, this.RightSeats, this.backSeat, this.frontSeat);

  }

  public ALeftNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (this.data.bookedSeats) {
      const found = this.data.bookedSeats.find(u => u.seatCode === `${position}${count}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count}`);
        disabled = true;
        if (booked) {
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
    }
    this.LeftSeats.push({seatcode: `${position}${count}`, color: color, index: index, disabled: disabled});
  }

  public ARightNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (this.data.bookedSeats) {
      const found = this.data.bookedSeats.find(u => u.seatCode === `${position}${count}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count}`);
        disabled = true;
        if (booked) {
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
    }
    this.RightSeats.push({seatcode: `${position}${count}`, color: color, index: index, disabled: disabled});
  }

  public BackNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (this.data.bookedSeats) {
      const found = this.data.bookedSeats.find(u => u.seatCode === `${position}${count}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count}`);
        disabled = true;
        if (booked) {
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
    }
    this.backSeat.push({seatcode: `${position}${count}`, color: color, index: index, disabled: disabled});
  }

  public FrontNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (this.data.bookedSeats) {
      const found = this.data.bookedSeats.find(u => u.seatCode === `${position}${count}`);
      if (found) {
        const booked = this.AllTickets.find(u => u.seatCode === `${position}${count}`);
        disabled = true;
        if (booked) {
          color = 'green';
        } else {
          color = '#f1d8b7';
        }
      }
    }
    this.frontSeat.push({seatcode: `${position}${count}`, color: color, index: index, disabled: disabled});
  }

  formatBookCode(value: Date, seatcode): any {
    return  `${value.getFullYear()}${value.getMonth() + 1}${value.getDate()}${value.getHours()}${value.getMinutes()}-${seatcode}`;
  }

  formatDate(value: Date): any {
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }

  SelectSeat(seatcode, position): void {
    this.currentDate = new Date();
    console.log('sc',seatcode);
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
      if (position === 'Left') {
        this.LeftSeats.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      if (position === 'Right') {
        this.RightSeats.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      if (position === 'Back') {
        this.backSeat.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      if (position === 'Front') {
        this.frontSeat.find(u => u.seatcode === seatcode).color = '#b7c7f1';
      }
      this.totalprice = this.totalprice + this.data.price;
    } else {
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
      if (position === 'Front') {
        this.frontSeat.find(u => u.seatcode === seatcode).color = 'white';
      }
      this.totalprice = this.totalprice - this.data.price;
    }
    this.ticketSelected();
    console.log(this.SelectedTickets);
  }

  ticketSelected() {
    this.tickSelect.emit(this.SelectedTickets);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ticketSelected();
  }
}
