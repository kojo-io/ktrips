import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-kz-calendar',
  templateUrl: './kz-calendar.component.html',
  styleUrls: ['./kz-calendar.component.scss'],
})
export class KzCalendarComponent implements OnInit {
  @Input() agDate: Date = new Date();
  @Input() useUTC = false;
  @Output() agDateChange = new EventEmitter<Date>();
  @Input() maxDate: Date = new Date(2100, 1, 1);
  @Input() minDate: Date = new Date() ;
  years: Array<any> = [];
  selectedYear: any;
  month: any;
  monthCount = 0;
  AllDays: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thurs',
    'Fri',
    'Sat'
  ];

  AllMonths: any[] = [
    {
      name: 'JANUARY',
      selected: false
    },
    {
      name: 'FEBRUARY',
      selected: false
    },
    {
      name: 'MARCH',
      selected: false
    },
    {
      name: 'APRIL',
      selected: false
    },
    {
      name: 'MAY',
      selected: false
    },
    {
      name: 'JUNE',
      selected: false
    },
    {
      name: 'JULY',
      selected: false
    },
    {
      name: 'AUGUST',
      selected: false
    },
    {
      name: 'SEPTEMBER',
      selected: false
    },
    {
      name: 'OCTOBER',
      selected: false
    },
    {
      name: 'NOVEMBER',
      selected: false
    },
    {
      name: 'DECEMBER',
      selected: false
    }
  ];

  Month: any;
  Day: any;
  Date: any;
  Year: any;

  AllDates: Array<any> = [];
  slidesOpts = {
    slidesPerView: 3,
    spaceBetween: 5,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1200: {
        slidesPerView: 9,
        spaceBetween: 5,
      },
    }
  };
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.GetYears();
    this.agDate = new Date();
    this.monthCount = this.agDate.getMonth();
    this.GetDefaultCalendar();

  }

  GetYears() {
    for (let i = this.minDate.getFullYear(); i <= this.maxDate.getFullYear(); i++) {
      this.years.push({year: i, selected: false});
    }
  }

  GetCalendar(date) {
    this.agDate = new Date(date);
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(this.agDate.getUTCFullYear(), this.agDate.getUTCMonth());
    } else {
      this.AllDates = this.DaysInMonth(this.agDate.getFullYear(), this.agDate.getMonth());
    }
  }

  GetDefaultCalendar() {
    if (this.useUTC) {
      this.AllDates = this.DaysInMonthUTC(this.agDate.getUTCFullYear(), this.agDate.getUTCMonth());
    } else {
      this.AllDates = this.DaysInMonth(this.agDate.getFullYear(), this.agDate.getMonth());
    }

    this.AllMonths.forEach(u => u.selected = false);
    this.AllMonths[this.agDate.getMonth()].selected = true;
    this.month = this.AllMonths[this.agDate.getMonth()].name;
    this.selectedYear = this.agDate.getFullYear();
    this.years.forEach(u => u.selected = false);
    this.years.find(u => u.year === this.agDate.getFullYear()).selected = true;
  }

  private DaysInMonth(year, month): any {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push({date: new Date(date), class: null});
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private DaysInMonthUTC(year, month): any {
    const date = new Date(Date.UTC(year, month, 1));
    const days = [];
    while (date.getUTCMonth() === month) {
      days.push({date: new Date(date), class: null});
      date.setDate(date.getUTCDate() + 1);
    }
    return days;
  }

  GetMonth(date: Date): any {
    // console.log(date);
    return this.AllMonths[date.getMonth()].name;
  }

  GetMonthUTC(date: Date): any {
    return this.AllMonths[date.getUTCMonth()].name;
  }

  GetUTCDay(date: Date): any {
    return this.AllDays[date.getUTCDay()];
  }

  GetDay(date: Date): any {
    return this.AllDays[date.getDay()];
  }

  GetDate(date: Date): any {
    return date.getDate();
  }

  GetUTCDate(date: Date): any {
    return date.getUTCDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes.agDate.currentValue);
    // this.GetCalendar();
  }

  GetPreviousMonth() {
    this.monthCount --;
    if (this.monthCount === -1) {
      this.monthCount = 11;
      console.log(this.monthCount);
      this.agDate = new Date(this.agDate.getFullYear() - 1, 11, 1);
    } else {
      this.agDate.setMonth(this.agDate.getMonth() - 1);
    }
    this.GetDefaultCalendar();
  }

  GetNextMonth() {
    this.monthCount ++;
    if (this.monthCount === 12) {
      this.monthCount = 0;
      console.log(this.monthCount);
      this.agDate = new Date(this.agDate.getFullYear() + 1, 0, 1);
    } else {
      this.agDate.setMonth(this.agDate.getMonth() + 1);
    }
    this.GetDefaultCalendar();
  }

  calendarMonthChange(event) {
    this.agDate.setMonth(this.AllMonths.findIndex(u => u.name === event.detail.value));
    this.GetDefaultCalendar();
  }

  calendarYearChange(event) {
    this.agDate = new Date(event.detail.value, this.agDate.getMonth(), 1);
    this.GetDefaultCalendar();
  }

  onCalendarChange(date, index: Element) {
    const allEle = document.getElementsByClassName('datec');
    for (let i = 0; i < allEle.length; i++) {
      allEle.item(i).classList.remove('selected');
    }
    index.classList.add('selected');
    this.agDateChange.emit(date);
  }
}
