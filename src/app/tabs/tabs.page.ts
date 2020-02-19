import {Component, OnInit} from '@angular/core';
import {BaseService} from "../utilities/base.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private baseService: BaseService,
              private router: Router,) {}

   ngOnInit() {
    if (this.baseService.checkUserAccount() === false) {
       this.router.navigate(['/user-info']);
    }
  }

}
