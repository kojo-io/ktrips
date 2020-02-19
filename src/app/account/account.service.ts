import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../utilities/base.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  UserRegister(info): any {
    return this.httpClient.post(`${this.baseService.getBaseUrl()}Account/AppRegister`, info);
  }
}
