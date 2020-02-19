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
import {BusresultsComponent} from '../busresults/busresults.component';
import {SearchPage} from './search.page';
import {SingleResultComponent} from '../single-result/single-result.component';
import {SelectedSeatsComponent} from '../selected-seats/selected-seats.component';
import {MomentModule} from 'ngx-moment';
import {MatChipsModule} from "@angular/material/chips";
import {SharedModule} from "../Shared/shared.module";
import {ReceiptComponent} from "../receipt/receipt.component";


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
        MatDatepickerModule,
        MatChipsModule,
        SharedModule
    ],
    declarations: [SearchPage],
    entryComponents: []
})
export class SearchPageModule {}
