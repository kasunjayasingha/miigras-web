import {Injectable} from '@angular/core';
import {AuthRequestDTO} from "../model/AuthRequestDTO";
import {HttpClient} from "@angular/common/http";
import {AUTENTICATION_URL_API} from "../app.component";
import {map} from "rxjs";
import {AuthResponseDTO} from "../model/AuthResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  login(authRequestDTO: AuthRequestDTO) {
    return this.http.post(AUTENTICATION_URL_API.LOGIN, authRequestDTO).pipe(map(result => (result as AuthResponseDTO)));
  }

  logout() {
    return this.http.get(AUTENTICATION_URL_API.LOGOUT);
  }
}
