import {Injectable} from '@angular/core';
import {AuthRequestDTO} from "../model/AuthRequestDTO";
import {HttpClient} from "@angular/common/http";
import {AUTENTICATION_URL_API, REGISTRATION_URL} from "../app.component";
import {map} from "rxjs";
import {AuthResponseDTO} from "../model/AuthResponseDTO";
import {UserModel} from "../model/UserModel";
import Swal from "sweetalert2";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    // if(this.configService.isTokenValid()){
    //   Swal.fire({
    //     title: 'Session Expired',
    //     text: 'Your session has expired. Please login again.',
    //     icon: 'warning',
    //     confirmButtonText: 'Ok',
    //     allowOutsideClick: false,
    //   }).then(() => {
    //     this.configService.logOut();
    //   });
    // }
  }

  register(user: UserModel) {
    return this.http.post(REGISTRATION_URL.REGISTER, user);
  }

  getAllUsers() {
    return this.http.get(REGISTRATION_URL.GET_ALL).pipe(map(result => (result as UserModel[])));
  }

  userStatusChange(user: UserModel) {
    return this.http.post(REGISTRATION_URL.USER_STATUS, user);
  }

  logout() {
    return this.http.get(AUTENTICATION_URL_API.LOGOUT);
  }
}
