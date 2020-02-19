import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';
import {RouteGuard} from '../utilities/route-guard.service';
import {BusresultsComponent} from '../busresults/busresults.component';
import {SelectedSeatsComponent} from '../selected-seats/selected-seats.component';
import {SingleResultComponent} from '../single-result/single-result.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouteGuard],
    component: SearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
