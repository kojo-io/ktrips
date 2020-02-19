import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RouteGuard} from "./utilities/route-guard.service";
import {BusresultsComponent} from "./busresults/busresults.component";
import {SelectedSeatsComponent} from "./selected-seats/selected-seats.component";
import {SingleResultComponent} from "./single-result/single-result.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoPageModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  },
  {
    path: 'bus-results',
    canActivate: [RouteGuard],
    component: BusresultsComponent
  },
  {
    path: 'selected-seats',
    canActivate: [RouteGuard],
    component: SelectedSeatsComponent
  },
  {
    path: 'single-result',
    canActivate: [RouteGuard],
    component: SingleResultComponent
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
