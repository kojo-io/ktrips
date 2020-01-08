import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  GetTickets(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/GetBusBooking`);
  }

  GetCancelTickets(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/GetBusBookingCancelled`);
  }

  CancelTicket(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/CancelBooking/${info}`);
  }
}
