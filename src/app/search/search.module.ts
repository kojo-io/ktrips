import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
} from '@angular/material';
import {BusresultsComponent} from './busresults/busresults.component';
import {SearchPage} from './search.page';
import {SingleResultComponent} from './single-result/single-result.component';
import {SelectedSeatsComponent} from './selected-seats/selected-seats.component';
import {MomentModule} from 'ngx-moment';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPageRoutingModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatListModule,
        MomentModule,
        MatDatepickerModule
    ],
    declarations: [SearchPage, BusresultsComponent, SingleResultComponent, SelectedSeatsComponent],
    entryComponents: [BusresultsComponent, SingleResultComponent, SelectedSeatsComponent]
})
export class SearchPageModule {}
