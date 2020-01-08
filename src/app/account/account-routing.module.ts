import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
import {RouteGuard} from '../utilities/route-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: AccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
