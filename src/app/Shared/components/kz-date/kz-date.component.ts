import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kz-date',
  templateUrl: './kz-date.component.html',
  styleUrls: ['./kz-date.component.scss'],
})
export class KzDateComponent implements OnInit {

  @Input() colorMonthYear: string;
  @Input() colorDate: string;
  @Input() colorDay: string;
  @Input() fontSizeMonthYear: string;
  @Input() fontSizeDate: string;
  @Input() fontSizeDay: string;

  AllDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursdays',
    'Friday',
    'Saturday'
  ];

  AllMonths: string[] = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];

  Month: any;
  Day: any;
  Date: any;
  Year: any;
  constructor() { }

  ngOnInit() {
    const localDate = new Date();
    this.Month = this.AllMonths[localDate.getMonth()];
    this.Day = this.AllDays[localDate.getDay()];
    this.Date = localDate.getDate();
    this.Year = localDate.getFullYear();
  }
}
