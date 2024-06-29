import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MainService} from "../../service/main.service";
import {ConfigService} from "../../service/config.service";
import {Router} from "@angular/router";
import {AgencyModule} from "./agency.module";
import {AgencyDTO} from "../../model/AgencyDTO";
import {DomainMinistryDTO} from "../../model/DomainMinistryDTO";
import Swal from "sweetalert2";

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  position: string = '';
  isAddEnabled: boolean = false;
  isAgencyFormSubmitted: boolean = false;
  ministryList: DomainMinistryDTO[] = []
  agencyDTO: AgencyDTO = {
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
  }

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
    this.getAllMinistries();
  }

  agencyForm = this.formBuilder.group({
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
    return this.agencyForm.controls;
  }

  onClickAgencyCreate() {
    this.isAddEnabled = true;
  }

  setMinistry(event: any) {
    this.agencyDTO.domainMinistry.id = event.value.id;
  }

  onAddAgencySubmit() {
    this.isAgencyFormSubmitted = true;
    if (this.agencyForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all the required fields.'});
      return;
    }
    this._mainService.saveAgency(this.agencyDTO).subscribe((res: any) => {
      if (res['success'] === "SUCCESS") {
        this.isAddEnabled = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Agency created successfully!',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.isAgencyFormSubmitted = false;
            this.agencyForm.reset();
            this.agencyDTO = {
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
            }
            this.route.navigate(['/miigras-web/agency']).then(r => r);
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Agency not created'});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
    });
  }

  getAllMinistries() {
    this._mainService.getAllMinistry().subscribe((data: Array<DomainMinistryDTO>) => {
      if (data.length > 0) {
        this.ministryList = data;
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
