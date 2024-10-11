import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DashboardService} from "../../service/dashboard.service";
import {MessageService} from "primeng/api";
import {ConfigService} from "../../service/config.service";
import {IncidentDTO} from "../../model/IncidentDTO";

@Component({
  selector: 'app-incident-user',
  templateUrl: './incident-user.component.html',
  styleUrls: ['./incident-user.component.scss']
})
export class IncidentUserComponent implements OnInit {

  incidentId: string = '';
  incidentData: any;

  constructor(
    private route: ActivatedRoute,
    private _dashboardService: DashboardService,
    private messageService: MessageService,
    private _configService: ConfigService
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

}
