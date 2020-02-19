import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
declare var WOW: any;

// const baseURL = 'https://localhost:44341/api/';
const  baseURL = 'https://mobilekazitrips.azurewebsites.net/api/';

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  wow: any;
  constructor(private router: Router, private httpClient: HttpClient
  ) { }

  private baseurl = baseURL;

  // tslint:disable-next-line:ban-types
    private booked = new BehaviorSubject<Boolean>(false);
    private connection = new BehaviorSubject<Boolean>(true);
    private canExist = new BehaviorSubject<Boolean>(true);

    canExistApp = this.canExist.asObservable();

    CanExist(value): void {
      this.canExist.next(value);
      this.wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
      });
      this.wow.init();
    }

    completed = this.booked.asObservable();
    IsCompleted(value): void {
      this.booked.next(value);
    }

    connectionStatus = this.connection.asObservable();
    IsConnected(value): void {
      this.connection.next(value);
    }


  getBaseUrl(): string {
    return this.baseurl;
  }

  setSessionData(data: any): void {
    localStorage.setItem('ustripsession', JSON.stringify(data));
  }

  getSesstionData(): any {
    if(localStorage.getItem('ustripsession') === 'undefined'){
      this.clearSessionData();
    }
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

  clearsessions(name): any {
    localStorage.removeItem(name);
  }

  getsessions(name): any {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name));
    }
    return false;
  }

  checkUserAccount(): any {
      if (this.getUserData().created === false) {
        return false;
      } else {
        return this.getUserData().created;
      }
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
