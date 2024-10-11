import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, map, Subscription, switchAll, switchMap} from "rxjs";
import {DASHBOARD_URL} from "../app.component";
import {CountryDTO} from "../model/CountryDTO";
import {DashboardDTO} from "../model/DashboardDTO";
import {IncidentDTO} from "../model/IncidentDTO";
import {IncidentDashBoardDTO} from "../model/IncidentDashBoardDTO";

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnDestroy {

  constructor(
    private http: HttpClient,
  ) {

  }


  getIncidentsData() {
    return this.http.get(DASHBOARD_URL.GET_ALL_INCIDENT_DATA).pipe(map(result => (result as Array<IncidentDashBoardDTO>)));
  }

  getTilesData() {
    return this.http.get(DASHBOARD_URL.GET_TILES_DATA).pipe(map(result => (result as DashboardDTO)));
  }

  getIncidentDataById(id: number) {
    return this.http.get(DASHBOARD_URL.GET_INCIDENT_DATA_BY_ID + id).pipe(map(result => (result as IncidentDTO)));
  }

  ngOnDestroy(): void {

  }
}
