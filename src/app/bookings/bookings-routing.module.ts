import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsPage } from './bookings.page';
import {RouteGuard} from '../utilities/route-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: BookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule {}
