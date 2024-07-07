import {Component, OnInit} from '@angular/core';
import {EmployeeDTO} from "../../../../model/EmployeeDTO";
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";
import {ConfigService} from "../../../../service/config.service";
import {Router} from "@angular/router";
import {MainService} from "../../../../service/main.service";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  employees: any[] = [];
  position: string = '';

  constructor(
    private messageService: MessageService,
    private _configService: ConfigService,
    private route: Router,
    private _mainService: MainService
  ) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  viewEmployee(employee: EmployeeDTO) {
    if (sessionStorage.getItem('employeeEdit') != null) {
      sessionStorage.removeItem('employeeEdit');
    }
    sessionStorage.setItem('employeeView', JSON.stringify(employee));
  }

  editEmployee(employee: EmployeeDTO) {
    if (sessionStorage.getItem('employeeView') != null) {
      sessionStorage.removeItem('employeeView');
    }
    sessionStorage.setItem('employeeEdit', JSON.stringify(employee));
  }

  getAllEmployees() {
    this.processing();
    this._mainService.getAllEmployee().subscribe((res: any) => {
      if (res != null) {
        this.employees = res.reverse();
        this.employees.forEach((employee: any) => {
          this._mainService.employeeCount++;
        });
        Swal.close();
      } else {
        Swal.close();
      }
    }, error => {
      Swal.close();
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });

  }

  processing() {
    let timerInterval = 0
    Swal.fire({
      title: 'Processing table <b></b> wait..',
      // html: 'Processing... <b></b> wait.',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          // @ts-ignore
          // b.textContent = Swal.getTimerLeft()
        }, 200)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

}
