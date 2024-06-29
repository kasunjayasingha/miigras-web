import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MinistryRoutingModule} from './ministry-routing.module';
import {MinistryComponent} from './ministry.component';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    MinistryComponent
  ],
  imports: [
    CommonModule,
    MinistryRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    DropdownModule
  ]
})
export class MinistryModule {
}
