import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActionSheetController, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import {AccountService} from "../account/account.service";
import {BaseService} from "../utilities/base.service";
import { Crop } from '@ionic-native/crop/ngx';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.page.html',
    styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
    form: FormGroup;
    image = 'assets/images/user.svg';
    offline = false;
    croppedImagepath = '';
    user: any;
    loginClick = false;
    options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    imagePickerOptions = {
        maximumImagesCount: 1,
        quality: 50
    };
    constructor(
        private router: Router,
        private baseService: BaseService,
        private formBuilder: FormBuilder,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private accountService: AccountService,
        public sanitizer: DomSanitizer,
        private base64: Base64,
        private file: File,
        private camera: Camera,
        private crop: Crop,
        private actionSheetController: ActionSheetController
    ) {
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

    async ngOnInit(): Promise<void> {

        if (this.baseService.getSesstionData() === false) {
            localStorage.removeItem('ustripsession');
            this.router.navigate(['/login']);
        }

        this.form = this.formBuilder.group({
            id: [null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.required],
            image: [null],
            contact: ['', Validators.required],
            dOB: [new Date(), Validators.required],
            emergencyContact1: [null, Validators.required],
            emergencyContact2: [null],
            emergencyContactName1: [null, Validators.required],
            emergencyContactName2: [null]
        })

        if (this.baseService.getUserData() !== false) {
            const loading = await this.loadingController.create({
                message: 'please wait while we load your info ...',
            });
            await loading.present();
            this.baseService.check().subscribe(async results => {
                this.setUserData(results.data);
                if (this.baseService.getUserData() !== false) {
                    const user = this.baseService.getUserData();
                    this.form.patchValue({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        contact: user.contact,
                        address: user.address,
                        email: user.email,
                        image: user.image,
                        dOB: user.dob,
                        emergencyContact1: user.emergencyContact1,
                        emergencyContact2: user.emergencyContact2,
                        emergencyContactName1: user.emergencyContactName1,
                        emergencyContactName2: user.emergencyContactName2
                    });
                    if(user.image) {
                        this.image = user.image;
                    }
                    await loading.dismiss();
                }
            });
        }

    }


    sanitize(img): any {
        if (img) {
            return this.sanitizer.bypassSecurityTrustUrl(img);
        } else {
            return null;
        }
    }

    loadImage(source) {
        const options: CameraOptions = {
            quality: 100,
            sourceType: source,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
           this.cropImage(imageData);

        }, async (err) => {
            const toast = await this.toastController.create({
                message: JSON.stringify(err),
                duration: 5000
            });
            await toast.present();
        });
    }


    cropImage(fileUrl) {
        this.crop.crop(fileUrl, { quality: 50 })
            .then(
                newPath => {
                    this.showCroppedImage(newPath.split('?')[0]);
                },
                error => {
                    alert('Error cropping image' + error);
                }
            );
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            buttons: [{
                text: 'From Gallery',
                icon: 'images',
                handler: () => {
                    this.loadImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
                {
                text: 'Camera',
                icon: 'aperture',
                handler: () => {
                    this.loadImage(this.camera.PictureSourceType.CAMERA);
                }
            },
                {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

    async register() {
        const loading = await this.loadingController.create({
            message: 'Please wait ...',
            // duration: 2000
        });
        await loading.present();
        this.loginClick = true;


        const creds = this.form.value;

        console.log(creds);

        this.accountService.UserRegister(creds).subscribe(
            async result => {
                if (result.status === 100) {
                    this.baseService.check().subscribe(results => {
                        this.setUserData(results.data);
                        if (this.baseService.getUserData() !== false) {
                            const user = this.baseService.getUserData();
                            this.form.patchValue({
                                firstName:  user.firstName,
                                lastName: user.lastName,
                                contact: user.contact,
                                address: user.address,
                                email: user.email,
                                image: user.image,
                                dOB: user.dOB,
                                emergencyContact1: user.emergencyContact1,
                                emergencyContact2: user.emergencyContact2,
                                emergencyContactName1: user.emergencyContactName1,
                                emergencyContactName2: user.emergencyContactName2
                            })

                            this.image = user.image;
                        }
                    });
                    await loading.dismiss();
                    const toast = await this.toastController.create({
                        message: JSON.stringify(result.message),
                        duration: 5000
                    });
                    await toast.present();
                } else {
                    const toast = await this.toastController.create({
                        message: JSON.stringify(result.message),
                        duration: 5000
                    });
                    await loading.dismiss();
                    await toast.present();
                }
            },
            async error => {
                if (error.status === 500) {
                    const toast = await this.toastController.create({
                        message: error.message,
                        duration: 5000
                    });
                    await toast.present();
                    await loading.dismiss();
                } else {
                    const toast = await this.toastController.create({
                        message: 'check your connection and try again',
                        duration: 5000
                    });
                    await toast.present();
                    await loading.dismiss();
                }
            }
        );
    }
    setUserData(result: any): void {
        console.log(result);
        this.baseService.setSessionData(result);
    }

    async dismiss() {
        await this.router.navigate(['/tabs/account']);
    }

    async showCroppedImage(ImagePath) {

        var copyPath = ImagePath;
        var splitPath = copyPath.split('/');
        var imageName = splitPath[splitPath.length - 1];
        var filePath = ImagePath.split(imageName)[0];
        const loading = await this.loadingController.create({
            message: 'please wait ...',
        });
        await loading.present();
        this.file.readAsDataURL(filePath, imageName).then(base64 => {
            this.image = base64;
            this.form.patchValue({
                image: base64
            });
            loading.dismiss();
        }, error => {
            alert('Error in showing image' + error);
            loading.dismiss();
        });
    }
}
