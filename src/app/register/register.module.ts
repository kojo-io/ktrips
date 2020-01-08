import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import {RouteGuard} from '../utilities/route-guard.service';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';

const routes: Routes = [
    // {
    //     path: '',
    //     component: RegisterPage
    // }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    // declarations: [RegisterPage],
    // entryComponents: [RegisterPage]
})
export class RegisterPageModule { }
