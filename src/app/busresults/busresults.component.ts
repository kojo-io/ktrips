import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BaseService} from '../utilities/base.service';
import {Router} from '@angular/router';
import { createAnimation } from "@ionic/core";

@Component({
    selector: 'app-busresults',
    templateUrl: './busresults.component.html',
    styleUrls: ['./busresults.component.scss'],
})
export class BusresultsComponent implements OnInit{
    @Input() data: any;
    @Input() from: string;
    @Input() to: string;
    @Input() complete: any;
    offline = false;
    slidesOpts = {
        slidesPerView: 1.2,
        speed: 400,
        spaceBetween: 5,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 5,
            },
            576: {
                slidesPerView: 1.4,
                spaceBetween: 5,
            },
            768: {
                slidesPerView: 2.4,
                spaceBetween: 5,
            },
            992: {
                slidesPerView: 3.4,
                spaceBetween: 5,
            },
            1200: {
                slidesPerView: 3.4,
                spaceBetween: 5,
            },
        }
    };
    constructor(public modalController: ModalController,
                private router: Router,
                private baseService: BaseService) {

        this.baseService.CanExist(false);
        this.baseService.completed.subscribe(
            async result => {
                this.complete = result;

                if (this.complete === true) {
                    await this.modalController.dismiss();
                }
            }
        );

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

    async ngOnInit() {
        this.data = this.baseService.getsessions('bresults').data;
        this.from = this.baseService.getsessions('bresults').from;
        this.to = this.baseService.getsessions('bresults').to;

        const ticketAnimation = createAnimation()
            .addElement(document.querySelector('.route'))
            .duration(1000)
            .beforeAddClass('')

        await ticketAnimation.play()
    }

    /*
    * dismiss the modal
    * */
    async dismiss() {
        await this.router.navigate(['/tabs/search']);
        this.baseService.clearsessions('bresults');
    }

    async openBus(data) {
        this.baseService.setsessions('sresults',
            {AvailableBus: data});
        await this.router.navigate(['/single-result']);
    }
}
