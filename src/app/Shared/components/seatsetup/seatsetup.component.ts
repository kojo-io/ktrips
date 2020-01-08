import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseService} from '../../../utilities/base.service';
import {DomSanitizer} from '@angular/platform-browser';
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
export class SeatsetupComponent implements OnInit {
  @Input() data: any;
  options = [];
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
  LeftSeats: Array<SeatCode> = [];
  RightSeats: Array<SeatCode> = [];
  backSeat: Array<SeatCode> = [];
  constructor(
    private formbuilder: FormBuilder,
    private baseService: BaseService,
    public sanitize: DomSanitizer
  ) { }

  ngOnInit() {
    this.SetSeat(this.data);
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

  public ALeftNumberSeat(index, count, position, data): any {
    let disabled = false;
    let color = 'white';
    if (index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `W${position}${count + 1}`);
      if (found) {
        disabled = true;
        color = '#f1d8b7';
      }
      this.LeftSeats.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 1) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        disabled = true;
        color = '#f1d8b7';
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
        disabled = true;
        color = '#f1d8b7';
      }
      this.RightSeats.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        disabled = true;
        color = '#f1d8b7';
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
        disabled = true;
        color = '#f1d8b7';
      }
      this.backSeat.push({seatcode: `W${position}${count + 1}`, color, index, disabled});
    }
    if ( index === 0) {
      const found = data.bookedSeats.find(u => u.seatCode === `${position}${count + 1}`);
      if (found) {
        disabled = true;
        color = '#f1d8b7';
      }
      this.backSeat.push({seatcode: `${position}${count + 1}`, color, index, disabled});
    }
  }
}
