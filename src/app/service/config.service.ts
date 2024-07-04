import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AppConfig} from "../layout/service/app.layout.service";
import {TokenService} from "./token.service";
import {AUTENTICATION_URL_API} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  constructor(
    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
  ) {
  }
  handleError(err: HttpErrorResponse) {
    // console.log("Begin", err);
    if (err.error instanceof ProgressEvent) {
      // Network Error
    } else if (err.error instanceof ErrorEvent) {
      console.log('An error occurred: ' + err.error.message);
    } else {
      if (err.status === 400) {
        console.log('An error occurred: ' + err.error.message);
      } else if (err.status === 301) {
        console.log('You will be logged out.');
        console.log('An error occurred: ' + err.error.message)
      } else if (err.status === 401) {
        console.log('You will be logged out.');
        this.logOut();

      } else if (err.status === 403) {
        console.log('An error occurred: ' + err.message);
        console.log('You will be logged out.');
        this.logOut();
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Your session has expired. Please login again.'

        });
      } else if (err.status === 404) {
        console.log('An error occurred: ' + err.error.message);
      } else if (err.status === 500) {
        const output = err.error.message;
        const tokenExpireMessageArray = output.split(' ');
        if (tokenExpireMessageArray.includes('JWT') && tokenExpireMessageArray.includes('expired')
          && tokenExpireMessageArray.includes('at')) {
          // this.isSessionExpired = true;
          // this.logOut('Your Seesion is expired, please login again');

        } else {
          console.log('An error occurred: ' + err.error.message);
        }
      } else {
        console.log('ELSE An error occurred: ' + err.error.message);
      }
    }
    return throwError(err);
  }

  isTokenValid() {
    return this.http.post(AUTENTICATION_URL_API.IS_TOKEN_VALID, "").subscribe((res:any) => {
      return res['success'] == 'FAILURE';
    });
  }


  logOut() {
    sessionStorage.clear();
    localStorage.clear();

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully Logged Out',
    });

    this.router.navigate([''])
  }
}
