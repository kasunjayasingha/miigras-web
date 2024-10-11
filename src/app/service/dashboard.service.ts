import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, map, Subscription, switchAll, switchMap} from "rxjs";
import {DASHBOARD_URL} from "../app.component";
import {CountryDTO} from "../model/CountryDTO";
import {DashboardDTO} from "../model/DashboardDTO";

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnDestroy{

  private subscription: Subscription | undefined;
  constructor(
    private http: HttpClient,
  ) {
    this.startScheduler();
  }

  startScheduler() {
    this.subscription = interval(1000).pipe(
      switchMap(
        () => this.callApi()
      )
    ).subscribe(
      res => {
        console.log(res);
      }
    )

  }

  callApi(){
    return this.http.get(DASHBOARD_URL.GET_ALL_INCIDENT_DATA);
  }

  getTilesData(){
    return this.http.get(DASHBOARD_URL.GET_TILES_DATA).pipe(map(result => (result as DashboardDTO)));
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
