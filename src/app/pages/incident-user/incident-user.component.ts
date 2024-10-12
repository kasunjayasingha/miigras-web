import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardService} from "../../service/dashboard.service";
import {MessageService} from "primeng/api";
import {ConfigService} from "../../service/config.service";
import {IncidentDTO} from "../../model/IncidentDTO";
import {FirebaseNotificationDTO} from "../../model/FirebaseNotificationDTO";
import {StandardResponse} from "../../model/StandardResponse";

@Component({
  selector: 'app-incident-user',
  templateUrl: './incident-user.component.html',
  styleUrls: ['./incident-user.component.scss']
})
export class IncidentUserComponent implements OnInit {

  incidentId: string = '';
  incidentData: any;
  showButton: boolean = false;
  notificationData: FirebaseNotificationDTO = {
    title: 'Complaint',
    body: 'Your Complaint is under investigation',
    fcmToken: ''
  }

  constructor(
    private route: ActivatedRoute,
    private _dashboardService: DashboardService,
    private messageService: MessageService,
    private _configService: ConfigService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.incidentId = this.route.snapshot.paramMap.get('incidentId')!;
    this.getIncidentDataById();
  }

  getIncidentDataById() {
    this._dashboardService.getIncidentDataById(Number(this.incidentId)).subscribe((res: IncidentDTO) => {
      if (res != null) {
        console.log(JSON.stringify(res));
        this.incidentData = res;
        this.loadMap();
      }

    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });
  }

  loadMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {lat: this.incidentData.employeeTracking.latitude, lng: this.incidentData.employeeTracking.longitude},
      zoom: 12,
    });

    new google.maps.Marker({
      position: {lat: this.incidentData.employeeTracking.latitude, lng: this.incidentData.employeeTracking.longitude},
      map: map,
      title: 'Location',
    });
  }

  setInvestigation() {
    if (!this.showButton) {
      this.notificationData.fcmToken = this.incidentData.employee.fcmToken;

      this._dashboardService.sendNotification(this.notificationData).subscribe((res: StandardResponse) => {
        if (res.success == 'SUCCESS') {
          this.showButton = true;
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Notification Sent Successfully'});
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
        if (error.status === 401) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
          this._configService.logOut();
        }
      });
    } else {
      this._dashboardService.completeIncident(this.incidentData).subscribe((res: StandardResponse) => {
        if (res.success == 'SUCCESS') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Complain Completed Successfully'});
          this.router.navigate(['/miigras-web']);
        }
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
        if (error.status === 401) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
          this._configService.logOut();
        }
      });
    }
  }

}
