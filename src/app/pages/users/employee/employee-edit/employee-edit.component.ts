import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../../../service/validation-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../service/main.service";
import {ConfigService} from "../../../../service/config.service";
import {Router} from "@angular/router";
import {GradientType} from "../../../../util/GradientType";
import {JobType} from "../../../../util/jobType";
import {EmployeeDTO} from "../../../../model/EmployeeDTO";
import {Role} from "../../../../util/Role";
import {AgencyDTO} from "../../../../model/AgencyDTO";
import {EmployeeTrackingDTO} from "../../../../model/EmployeeTrackingDTO";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm!: FormGroup;
  position: string = '';
  viewIfHas: boolean = false;
  employeeDTO: EmployeeDTO = {
    id: 0,
    empId: '',
    jobType: JobType.WORKER,
    person: {
      id: 0,
      firstName: '',
      lastName: '',
      nic: '',
      email: '',
      mobile1: '',
      mobile2: '',
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
        mobile2: '',
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
  agencyList: AgencyDTO[] = [];
  isEmployeeFormSubmitted: boolean = false;
  isEmployeeView: boolean = false;

  gradientTypeList = [
    {name: 'Father', value: GradientType.FATHER},
    {name: 'Mother', value: GradientType.MOTHER},
    {name: 'Spouse', value: GradientType.SPOUSE},
    {name: 'Child', value: GradientType.CHILD},
    {name: 'Sibling', value: GradientType.SIBLING},
    {name: 'Grandparent', value: GradientType.GRANDPARENT},
    {name: 'Grandchild', value: GradientType.GRANDCHILD},
    {name: 'Aunt', value: GradientType.AUNT},
    {name: 'Uncle', value: GradientType.UNCLE},
    {name: 'Cousin', value: GradientType.COUSIN},
    {name: 'Nephew', value: GradientType.NEPHEW},
    {name: 'Niece', value: GradientType.NIECE},
    {name: 'Friend', value: GradientType.FRIEND},
    {name: 'Other', value: GradientType.OTHER},
  ]

  jobTypeList = [
    {name: 'Worker', value: JobType.WORKER},
    {name: 'Driver', value: JobType.DRIVER},
    {name: 'Cleaner', value: JobType.CLEANER},
    {name: 'Security', value: JobType.SECURITY},
    {name: 'Helper', value: JobType.HELPER},
    {name: 'House Wife', value: JobType.HOUSE_WIFE},
  ];

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

  ngOnInit(): void {
    this.reactiveForm();
    this.getAllAgencies();

    if (sessionStorage.getItem('employeeView') != null) {
      this.isEmployeeView = true;
      this.dataLoad(JSON.parse(sessionStorage.getItem('employeeView')!))
      this.employeeForm.disable();
    }
    if (sessionStorage.getItem('employeeEdit') != null) {
      this.dataLoad(JSON.parse(sessionStorage.getItem('employeeEdit')!))
    }
  }

  dataLoad(employee: EmployeeDTO) {
    this.employeeDTO = employee;
    this.employeeForm.patchValue(this.employeeDTO);
    this.gradientTypeList.forEach((item) => {
      if (item.value == this.employeeDTO.gradient.gradientType) {
        this.employeeForm.controls['gradientType'].patchValue(item);
      }
    });
    this.jobTypeList.forEach((item) => {
      if (item.value == this.employeeDTO.jobType) {
        this.employeeForm.controls['jobType'].patchValue(item);
      }
    });
    this.getEmployeeLocationByEmployeeId();
  }

  reactiveForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      nic: [null, [Validators.required, Validators.pattern(this._validationService.sriLankaNICValidation())]],
      email: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
      phone2: [null, [Validators.pattern(this._validationService.mobileNumberValidation())]],
      empId: [{value: null, disabled: true}],
      agency: [null, Validators.required],
      passport: [null],
      dob: [null, Validators.required],
      jobType: [null, Validators.required],

      houseNumberE: [null],
      streetOneE: [null],
      streetTwoE: [null],
      city: [null, Validators.required],
      district: [null, Validators.required],
      postalCode: [null, Validators.required],

      gradientType: [null, Validators.required],
      firstNameG: [null, Validators.required],
      lastNameG: [null, Validators.required],
      nicG: [null, [Validators.required, Validators.pattern(this._validationService.sriLankaNICValidation())]],
      emailG: [null, Validators.required],
      phoneG: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
      phone2G: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
      passportG: [null],
      sameAsEmployeeAddress: [null, Validators.required],
      houseNumberG: [null],
      streetOneG: [null],
      streetTwoG: [null],
      cityG: [null, Validators.required],
      districtG: [null, Validators.required],
      postalCodeG: [null, Validators.required],
    });
  }


  get f1() {
    return this.employeeForm.controls;
  }

  setGradientType(event: any) {
    this.employeeDTO.gradient.gradientType = event.value;
  }

  setJobType(event: any) {
    this.employeeDTO.jobType = event.value;
  }

  setAgency(event: any) {
    this.employeeDTO.agency.id = event.value.id;
  }

  onSameAsEmployeeAddressChange(event: any) {

    if (event.value == "true") {
      this.employeeDTO.gradient.sameAsEmployeeAddress = true;
      this.employeeDTO.gradient.person.address.houseNumber = this.employeeDTO.person.address.houseNumber;
      this.employeeDTO.gradient.person.address.streetOne = this.employeeDTO.person.address.streetOne;
      this.employeeDTO.gradient.person.address.streetTwo = this.employeeDTO.person.address.streetTwo;
      this.employeeDTO.gradient.person.address.city = this.employeeDTO.person.address.city;
      this.employeeDTO.gradient.person.address.district = this.employeeDTO.person.address.district;
      this.employeeDTO.gradient.person.address.postalCode = this.employeeDTO.person.address.postalCode;


      this.employeeForm.controls['houseNumberG'].disable();
      this.employeeForm.controls['streetOneG'].disable();
      this.employeeForm.controls['streetTwoG'].disable();
      this.employeeForm.controls['cityG'].disable();
      this.employeeForm.controls['districtG'].disable();
      this.employeeForm.controls['postalCodeG'].disable();
    } else {
      this.employeeDTO.gradient.sameAsEmployeeAddress = false;
      this.employeeForm.controls['houseNumberG'].enable();
      this.employeeForm.controls['streetOneG'].enable();
      this.employeeForm.controls['streetTwoG'].enable();
      this.employeeForm.controls['cityG'].enable();
      this.employeeForm.controls['districtG'].enable();
      this.employeeForm.controls['postalCodeG'].enable();

      this.employeeDTO.gradient.person.address.houseNumber = '';
      this.employeeDTO.gradient.person.address.streetOne = '';
      this.employeeDTO.gradient.person.address.streetTwo = '';
      this.employeeDTO.gradient.person.address.city = '';
      this.employeeDTO.gradient.person.address.district = '';
      this.employeeDTO.gradient.person.address.postalCode = '';
    }
  }

  onUpdateEmployeeSubmit() {
  }

  getAllAgencies() {
    this._mainService.getAllAgency().subscribe((data: Array<AgencyDTO>) => {
      if (data.length > 0) {
        this.agencyList = data;
      } else {
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });
  }

  getEmployeeLocationByEmployeeId() {
    this._mainService.getEmployeeLocationByEmployeeId(this.employeeDTO.id).subscribe((res: EmployeeTrackingDTO) => {
      if (res.longitude > 0 && res.latitude > 0) {
        this.loadMap(res);
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });

  }

  loadMap(data: EmployeeTrackingDTO): void {
    this.viewIfHas = true;
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {lat: data.latitude, lng: data.longitude},
      zoom: 12,
    });

    new google.maps.Marker({
      position: {lat: data.latitude, lng: data.longitude},
      map: map,
      title: 'Location',
    });
  }

}
