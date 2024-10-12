import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN_URL} from "../app.component";
import {map} from "rxjs";
import {CountryDTO} from "../model/CountryDTO";
import {DomainMinistryDTO} from "../model/DomainMinistryDTO";
import {AgencyDTO} from "../model/AgencyDTO";
import {EmployeeDTO} from "../model/EmployeeDTO";
import Swal from "sweetalert2";
import {ConfigService} from "./config.service";
import {EmployeeTrackingDTO} from "../model/EmployeeTrackingDTO";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public employeeCount: number = 0;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
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

  isAddEnabled: boolean = false;

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

  saveMinistry(ministryDTO: DomainMinistryDTO) {
    return this.http.post(MAIN_URL.MINISTRY.SAVE, ministryDTO);
  }

  getAllMinistry() {
    return this.http.get(MAIN_URL.MINISTRY.GET_ALL).pipe(map(result => (result as Array<DomainMinistryDTO>)));
  }

  saveAgency(agencyDTO: AgencyDTO) {
    return this.http.post(MAIN_URL.AGENCY.SAVE, agencyDTO);
  }

  getAllAgency() {
    return this.http.get(MAIN_URL.AGENCY.GET_ALL).pipe(map(result => (result as Array<AgencyDTO>)));
  }

  generateEmpId() {
    return this.http.get(MAIN_URL.EMPLOYEE.GENERATE_EMP_ID).pipe(map(result => (result as string)));
  }

  saveEmployee(employeeDTO: EmployeeDTO) {
    return this.http.post(MAIN_URL.EMPLOYEE.SAVE, employeeDTO);
  }

  getAllEmployee() {
    return this.http.get(MAIN_URL.EMPLOYEE.GET_ALL).pipe(map(result => (result as Array<EmployeeDTO>)));
  }

  getEmployeeLocationByEmployeeId(employeeId: number) {
    return this.http.get(MAIN_URL.COUNTRY.GET_EMPLOYEE_LOCATION_BY_EMP_ID + employeeId).pipe(map(result => (result as EmployeeTrackingDTO)));
  }
}
