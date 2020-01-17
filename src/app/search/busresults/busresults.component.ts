import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BaseService} from '../../utilities/base.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-busresults',
  templateUrl: './busresults.component.html',
  styleUrls: ['./busresults.component.scss'],
})
export class BusresultsComponent implements OnInit {
  @Input() data: any;
  @Input() from: string;
  @Input() to: string;
  @Input() complete: any;
  constructor(public modalController: ModalController,
              private router: Router,
              private baseService: BaseService) {
    this.baseService.completed.subscribe(
        async result => {
          this.complete = result;

          if (this.complete === true) {
            await this.modalController.dismiss();
          }
        }
    );
  }

  ngOnInit() {
     this.data = this.baseService.getsessions('bresults').data;
     this.from = this.baseService.getsessions('bresults').from;
     this.to = this.baseService.getsessions('bresults').to;
  }

  /*
  * dismiss the modal
  * */
  async dismiss() {
    await this.modalController.dismiss();
  }

  async openBus(data) {
    this.baseService.setsessions('sresults',
        {AvailableBus: data});
    await this.router.navigate(['/tabs/search/single-result']);
  }
}
