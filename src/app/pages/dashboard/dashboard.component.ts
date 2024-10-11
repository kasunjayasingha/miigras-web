import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../layout/service/app.layout.service";
import {Subscription} from "rxjs";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder} from "@angular/forms";
import {MainService} from "../../service/main.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {DashboardService} from "../../service/dashboard.service";
import {DashboardDTO} from "../../model/DashboardDTO";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy  {
  items!: MenuItem[];

  products!: any;

  dashboardDTO!: DashboardDTO;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _dashboardService: DashboardService,
    private route: Router,
    private _configService: ConfigService
  ) {
  }

  ngOnInit() {
    this.getTilesData();
  }

  getTilesData() {
    this._dashboardService.getTilesData().subscribe((res: DashboardDTO) => {
      if (res != null) {
        this.dashboardDTO = res;
        console.log(JSON.stringify(this.dashboardDTO));
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error });
      if (error.status === 401) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You will be logged out.' });
        this._configService.logOut();
      }
    });
  }


  ngOnDestroy() {

  }

}
