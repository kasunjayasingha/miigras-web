import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from "../../layout/service/app.layout.service";
import {catchError, interval, Observable, Subscription, switchMap, tap, throwError} from "rxjs";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder} from "@angular/forms";
import {MainService} from "../../service/main.service";
import {Router} from "@angular/router";
import {ConfigService} from "../../service/config.service";
import {DashboardService} from "../../service/dashboard.service";
import {DashboardDTO} from "../../model/DashboardDTO";
import {CountryDTO} from "../../model/CountryDTO";
import {IncidentDTO} from "../../model/IncidentDTO";
import {IncidentDashBoardDTO} from "../../model/IncidentDashBoardDTO";
import {PersonDTO} from "../../model/PersonDTO";
import {PredictionDTO} from "../../model/PredictionDTO";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];

  products!: any;

  private subscription: Subscription | undefined;

  dashboardDTO: DashboardDTO = {
    sosCount: 0,
    newSosCount: 0,
    complaintCount: 0,
    newComplaintCount: 0,
    employeeCount: 0,
    newEmployeeCount: 0,
    messageCount: 0,
    newMessageCount: 0
  }

  incidents: IncidentDashBoardDTO[] = [];
  todayPredictions: PredictionDTO[] = [];
  lastPredictions: PredictionDTO[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _dashboardService: DashboardService,
    private route: Router,
    private _configService: ConfigService
  ) {
    this.startScheduler();
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
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });
  }

  startScheduler() {
    this.subscription = interval(1000).pipe(
      switchMap(() => this.getIncidentsData()) // Now returns the Observable
    ).subscribe(
      res => {
      }
    );
  }

  getIncidentsData(): Observable<Array<IncidentDashBoardDTO>> {
    return this._dashboardService.getIncidentsData().pipe(
      tap((res: Array<IncidentDashBoardDTO>) => {
        if (res != null && res[0].employeeName != null) {
          // console.log(JSON.stringify(res));
          // console.log("2");
          this.incidents = res;
          this.todayPredictions = this.incidents[0].todayPrediction;
          this.lastPredictions = this.incidents[0].lastPrediction;
        } else if (res != null && (res[0].todayPrediction != null || res[0].lastPrediction != null)) {
          this.todayPredictions = res[0].todayPrediction;
          this.lastPredictions = res[0].lastPrediction;
        }
      }),
      catchError(error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
        if (error.status === 401) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
          this._configService.logOut();
        }
        return throwError(() => error); // Ensure that the error is propagated
      })
    );
  }

  viewIncident(incident: IncidentDashBoardDTO) {
    const incidentId = incident.id; // Assuming 'incident.id' holds the ID of the incident
    const url = `${window.location.origin}/miigras-web/incidentUser/${incidentId}`;
    window.open(url, '_blank');
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }

}
