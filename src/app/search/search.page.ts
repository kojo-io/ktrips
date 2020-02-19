import {Component, Input, OnInit, AfterContentInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseService} from '../utilities/base.service';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {SearchService} from './search.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BusresultsComponent} from '../busresults/busresults.component';
import {Router} from '@angular/router';
import {Network} from "@ionic-native/network/ngx";

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterContentInit {
    offline = false;
    mindate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    maxdate = new Date(2100, 1, 1);
    showloader = false;
    noshow = false;
    searchForm: FormGroup;
    options = [];
    AllRoutesFrom: Array<any> = [];
    AllRoutesTo: Array<any> = [];
    AllRoutes: Array<any> = [];
    AllAvailableBuses: Array<any> = [];
    filteredOptionsFrom: Observable<any[]>;
    filteredOptionsTo: Observable<any[]>;
    @Input() complete: any;
    canExit: Boolean = true;
    constructor(
        private formbuilder: FormBuilder,
        private baseService: BaseService,
        public toastController: ToastController,
        public loadingController: LoadingController,
        private searchService: SearchService,
        public modalController: ModalController,
        private router: Router,
        private network: Network
    ) {
        this.baseService.completed.subscribe(
            async result => {
                this.complete = result;
            }
        );

        this.baseService.CanExist(true);
        this.baseService.connectionStatus.subscribe(
            async result => {
                if (!result) {
                    this.offline = true;
                    this.ngOnInit();
                } else {
                    this.offline = false;
                }
            }
        );
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        this.GetRoutes();
        this.searchForm = this.formbuilder.group({
            from: [null, Validators.required],
            to: [null, Validators.required],
            date: [null, Validators.required]
        });
        this.GetRoutes();


        this.searchForm.get('from').valueChanges.subscribe(
            value => {
                this.AllRoutesTo = this.AllRoutes.slice();
                this.AllRoutesTo.splice(this.AllRoutesTo.findIndex(route => route === value), 1);
            }
        );

        this.searchForm.get('to').valueChanges.subscribe(
            value => {
                this.AllRoutesFrom = this.AllRoutes.slice();
                this.AllRoutesFrom.splice(this.AllRoutesFrom.findIndex(route => route === value), 1);
            }
        );

        this.filteredOptionsFrom = this.searchForm.get('from').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterFrom(value))
            );
        this.filteredOptionsTo = this.searchForm.get('to').valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterTo(value))
            );
    }

    // formatDate(): any {
    //     const value = this.today;
    //     console.log(`${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`);
    //     return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    // }

    getDate(event) {
        this.searchForm.get('date').setValue(event);
        console.log(event);
    }

    GetRoutes(): void {
        this.searchService.GetRoutes().subscribe(
            result => {
                this.AllRoutes = result.data;
                this.AllRoutesFrom = result.data;
                this.AllRoutesTo = result.data;
                // console.log(this.AllRoutes);
            }
        );
    }

    async presentResults() {
        const modal = await this.modalController.create({
            component: BusresultsComponent
        });
        return await modal.present();
    }

    async GetAvailable(): Promise<void> {
        const loading = await this.loadingController.create({
            message: 'searching available buses ...',
        });
        this.baseService.IsCompleted(false);
        await loading.present();
        const data = this.searchForm.value;
        this.showloader = true;
        this.noshow = false;
        this.AllAvailableBuses = [];
        this.searchService.GetBus(data).subscribe(
            async result => {
                this.showloader = false;
                if (result.status === 201) {
                    const toast = await this.toastController.create({
                        message: result.message,
                        duration: 5000,
                    });
                    this.noshow = true;
                    await loading.dismiss();
                    await toast.present();
                }
                if (result.status === 103) {
                    const toast = await this.toastController.create({
                        message: result.message[0].description,
                        duration: 5000,
                    });
                    this.noshow = true;
                    await loading.dismiss();
                    await toast.present();
                }
                if (result.status === 500) {
                    const toast = await this.toastController.create({
                        message: result.message,
                        duration: 5000,
                    });
                    this.noshow = true;
                    await loading.dismiss();
                    await toast.present();
                }
                if (result.status === 100) {
                    this.AllAvailableBuses = result.data;
                    if (this.AllAvailableBuses.length === 0) {
                        const toast = await this.toastController.create({
                            message: 'No bus found',
                            duration: 5000,
                        });
                        await loading.dismiss();
                        await toast.present();
                    } else {
                        await loading.dismiss();
                        this.baseService.setsessions('bresults',
                            {data: this.AllAvailableBuses,
                            from: this.searchForm.get('from').value,
                            to: this.searchForm.get('to').value});
                        await this.router.navigate(['/bus-results']);
                    }
                    console.log(result.data);
                }
            },
            async error => {
                const toast = await this.toastController.create({
                    message: 'something went wrong',
                    duration: 5000,
                });
                this.showloader = false;
                this.noshow = true;
                await loading.dismiss();
                await toast.present();
            }
        );
    }

    private _filterFrom(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.AllRoutesFrom.filter(option => option.toLowerCase().includes(filterValue));
    }

    private _filterTo(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.AllRoutesTo.filter(option => option.toLowerCase().includes(filterValue));
    }
}

