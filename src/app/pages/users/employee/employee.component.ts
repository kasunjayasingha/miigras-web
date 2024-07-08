import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../../service/validation-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../service/main.service";
import {ConfigService} from "../../../service/config.service";
import {Router} from "@angular/router";
import {EmployeeDTO} from "../../../model/EmployeeDTO";
import {Role} from "../../../util/Role";
import {GradientType} from "../../../util/GradientType";
import {AgencyDTO} from "../../../model/AgencyDTO";
import {DomainMinistryDTO} from "../../../model/DomainMinistryDTO";
import Swal from "sweetalert2";
import {JobType} from "../../../util/jobType";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  position: string = '';
  isAddEnabled: boolean = false;
  isEmployeeFormSubmitted: boolean = false;
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
  employeeCount = 0;

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

  reactiveForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      nic: [null, [Validators.required, Validators.pattern(this._validationService.sriLankaNICValidation())]],
      email: [null, [Validators.required, Validators.pattern(this._validationService.emailValidation())]],
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

  ngOnInit() {
    this.reactiveForm();
    this.employeeCount = this._mainService.employeeCount;
  }

  setGradientType(event: any) {
    this.employeeDTO.gradient.gradientType = event.value.value;
  }

  setJobType(event: any) {
    console.log("1 "+event.value);
    console.log("2 "+event.value.value);
    this.employeeDTO.jobType = event.value.value;
  }

  setAgency(event: any) {
    this.employeeDTO.agency.id = event.value.id;
  }

  onClickEmployeeCreate() {
    this.getAllAgencies();
    this.generateEmpId();
    this.isAddEnabled = true;
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

  onAddEmployeeSubmit() {
    this.isEmployeeFormSubmitted = true;
    if (this.employeeForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill the required fields'});
      return;
    }
    this.employeeDTO.user.firstName = this.employeeDTO.person.firstName;
    this.employeeDTO.user.lastName = this.employeeDTO.person.lastName;
    this.employeeDTO.user.email = this.employeeDTO.person.email;
    this.employeeDTO.user.password = "";
    this.employeeDTO.user.role = Role.WORKER;
    this.employeeDTO.user.enabled = true;
    this._mainService.saveEmployee(this.employeeDTO).subscribe((data: any) => {
      if (data['success'] === 'SUCCESS') {
        this.isAddEnabled = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Employee created successfully',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          this.isEmployeeFormSubmitted = false;
          this.employeeForm.reset();
          this.employeeDTO = {
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
          this.route.navigate(['/miigras-web/users/employee']);
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Employee creation failed'});
      }
    });
  }

  generateEmpId() {
    this._mainService.generateEmpId().subscribe((data: any) => {
      this.employeeDTO.empId = data['message'];
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });
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

}
