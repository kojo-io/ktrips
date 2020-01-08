import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  login(userlogin): any {
    // alert('something');
    return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/Login', userlogin);
  }
}
