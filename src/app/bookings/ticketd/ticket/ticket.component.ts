import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BaseService} from "../../../utilities/base.service";

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
  offline = false;
  constructor(public modalController: ModalController,
              private baseService: BaseService)
  {
    this.baseService.CanExist(false);
    this.baseService.connectionStatus.subscribe(
        async result => {
          if (!result) {
            this.offline = true;
          } else {
            this.offline = false;
          }
        }
    );
  }

  ngOnInit() {}

  async dismiss() {
    await this.modalController.dismiss();
  }

  formatDate(value): any {
    value = new Date(value);
    return `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;
  }
}
