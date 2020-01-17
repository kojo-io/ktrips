import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';

// const baseURL = 'https://localhost:44341/api/';
const  baseURL = 'https://mobilekazitrips.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private router: Router, private httpClient: HttpClient
  ) { }

  private baseurl = baseURL;

  // tslint:disable-next-line:ban-types
    private booked = new BehaviorSubject<Boolean>(false);

    completed = this.booked.asObservable();

    IsCompleted(value): void {
      this.booked.next(value);
    }


  getBaseUrl(): string {
    return this.baseurl;
  }

  setSessionData(data: any): void {
    localStorage.setItem('ustripsession', JSON.stringify(data));
  }

  getSesstionData(): any {
    if (localStorage.getItem('ustripsession')) {
      return JSON.parse(localStorage.getItem('ustripsession'));
    }
    return false;
  }

  clearSessionData(): any {
      localStorage.removeItem('ustripsession');
  }

  setsessions(name, data): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  getsessions(name): any {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return false;
  }

  getToken(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().accesstoken;
    }
    return false;
  }

  getUserData(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().user;
    }
    return false;
  }

  getUserRole(): any {
    if (this.getSesstionData()) {
      return this.getSesstionData().role;
    }
    return false;
  }

  check(): any {
    return this.httpClient.post(this.getBaseUrl() + 'Account/CheckExpiry', { id: this.getUserData().id, token: this.getToken().token });
  }
  logout(): any {
    return this.httpClient.get(this.getBaseUrl() + 'Account/Logout/' + this.getUserData().id);
  }
}
