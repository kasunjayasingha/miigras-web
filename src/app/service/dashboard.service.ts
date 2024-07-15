import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Subscription, switchAll, switchMap} from "rxjs";
import {DASHBOARD_URL} from "../app.component";

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

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
