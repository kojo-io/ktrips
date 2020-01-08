import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import {MatTabsModule} from '@angular/material';
import {TicketdComponent} from './ticketd/ticketd.component';
import {MomentModule} from 'ngx-moment';
import {NgxBarcodeModule} from 'ngx-barcode';
import {TicketComponent} from './ticketd/ticket/ticket.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookingsPageRoutingModule,
        MatTabsModule,
        MomentModule,
        NgxBarcodeModule
    ],
    declarations: [BookingsPage, TicketdComponent, TicketComponent],
    entryComponents: [TicketdComponent, TicketComponent]
})
export class BookingsPageModule {}
