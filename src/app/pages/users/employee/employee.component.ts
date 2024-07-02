import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MainService} from "../../../service/main.service";
import {ConfigService} from "../../../service/config.service";
import {Router} from "@angular/router";
import {EmployeeDTO} from "../../../model/EmployeeDTO";
import {Role} from "../../../util/Role";
import {GradientType} from "../../../util/GradientType";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  position: string = '';
  isAddEnabled: boolean = false;
  isEmployeeFormSubmitted: boolean = false;
  employeeDTO: EmployeeDTO = {
    id: 0,
    empId: '',
    person: {
      id: 0,
      firstName: '',
      lastName: '',
      nic: '',
      email: '',
      mobile1: '',
      pmobile2: '',
      passport: '',
      dob: '',
      address: {
        id: 0,
        houseNumber: '',
        streetOne: '',
        streetTwo: '',
        village: '',
        city: '',
        district: '',
        postalCode: '',
      }
    },
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: Role.WORKER,
      enabled: true
    },
    agency: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      phone2: '',
      regNum: '',
      fax: '',
      addressAgency: {
        id: 0,
        houseNumber: '',
        streetOne: '',
        streetTwo: '',
        village: '',
        city: '',
        district: '',
        postalCode: '',
      },
      domainMinistry: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        fax: '',
        country: {
          id: 0,
          name: '',
          code: '',
          ntpTime: ''
        }
      }
    },
    gradient: {
      id: 0,
      gradientType: GradientType.OTHER,
      person: {
        id: 0,
        firstName: '',
        lastName: '',
        nic: '',
        email: '',
        mobile1: '',
        pmobile2: '',
        passport: '',
        dob: '',
        address: {
          id: 0,
          houseNumber: '',
          streetOne: '',
          streetTwo: '',
          village: '',
          city: '',
          district: '',
          postalCode: '',
        }
      },
      sameAsEmployeeAddress: false,
    }

  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _configService: ConfigService,
    private route: Router
  ) {
  }

  employeeForm = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
    phone2: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
    regNum: [null, Validators.required],
    domainMinistry: [null, Validators.required],

    streetOne: [null],
    streetTwo: [null],
    city: [null, Validators.required],
    district: [null, Validators.required],
    postalCode: [null, Validators.required],
  });

  get f1() {
    return this.employeeForm.controls;
  }

  ngOnInit() {
  }

  onClickEmployeeCreate() {
  }

  onAddEmployeeSubmit() {
  }

}
