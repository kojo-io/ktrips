import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../utilities/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
    private baseService: BaseService,
  ) { }

  register(user): any {
    return this.httpClient.post(this.baseService.getBaseUrl() + 'Account/register', user);
  }
}
