import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgencyRoutingModule} from './agency-routing.module';
import {AgencyEditComponent} from './agency-edit/agency-edit.component';
import {AgencyViewComponent} from "./agency-view/agency-view.component";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";


@NgModule({
  declarations: [
    AgencyEditComponent,
    AgencyViewComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
  ]
})
export class AgencyModule {
}
