import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN_URL} from "../app.component";
import {map} from "rxjs";
import {CountryDTO} from "../model/CountryDTO";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllCountry() {
    return this.http.get(MAIN_URL.COUNTRY.GET_ALL).pipe(map(result => (result as Array<CountryDTO>)));
  }

  saveCountry(countryDTO: CountryDTO) {
    return this.http.post(MAIN_URL.COUNTRY.SAVE, countryDTO);
  }

  checkCountryIsExist(code: string, name: string) {
    return this.http.get(MAIN_URL.COUNTRY.CHEACK_COUNTRY_EXIST + "?code=" + code + "&name=" + name);
  }

  deleteCountry(id: number) {
    return this.http.delete(MAIN_URL.COUNTRY.DELETE + "?id=" + id);
  }
}
