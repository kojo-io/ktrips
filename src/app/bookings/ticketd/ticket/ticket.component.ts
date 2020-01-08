import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() company: any;
  @Input() route: any;
  @Input() data: any;
  @Input() numberPlate: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  formatDate(value): any {
    value = new Date(value);
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }
}
