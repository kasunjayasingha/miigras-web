import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserComponent} from './user/user.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeEditComponent} from './employee/employee-edit/employee-edit.component';
import {EmployeeViewComponent} from './employee/employee-view/employee-view.component';
import {TableModule} from "primeng/table";
import {InputSwitchModule} from "primeng/inputswitch";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {RippleModule} from "primeng/ripple";
import {RadioButtonModule} from "primeng/radiobutton";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    UserComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    EmployeeViewComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        TableModule,
        InputSwitchModule,
        ToastModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ChipsModule,
        RippleModule,
        RadioButtonModule,
        CalendarModule
    ]
})
export class UsersModule {
}
