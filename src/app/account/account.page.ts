import { Component, OnInit } from '@angular/core';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
      private router: Router,
      private baseService: BaseService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.baseService.logout().subscribe(
        result => {
          if (result.status === 105) {
            this.router.navigate(['/']);
          }
        }
    );
  }
}
