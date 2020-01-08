import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  GetBus(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Booking/GetAvailable`, info);
  }

  GetRoutes(): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/GetRoutes`);
  }

  GetRoutePoints(busId, CompanyId): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/GetBusRoutes/${busId}/${CompanyId}`);
  }

  GetStationRoutesTo(id): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}CompanyStations/GetStationRoutesTo/${id}`);
  }

  PostBook(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Booking/PostBusBooking`, info);
  }

  GetTickets(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}Booking/GetAllTickets/${info}`);
  }

  GetBooked(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}BusBookings/GetBooked/${info}`);
  }

  GetBookings(info): any {
    return this.httpClient.get(`${this.baseService.getBaseUrl()}BusBookings/GetBusBookings/${info}`);
  }
}
