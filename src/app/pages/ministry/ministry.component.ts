import {Component, OnInit} from '@angular/core';
import {DomainMinistryDTO} from "../../model/DomainMinistryDTO";
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MainService} from "../../service/main.service";
import {Router} from "@angular/router";
import {CountryDTO} from "../../model/CountryDTO";
import Swal from "sweetalert2";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.scss']
})
export class MinistryComponent implements OnInit {

  ministries: DomainMinistryDTO[] = [];
  position: string = '';
  isAddEnabled: boolean = false;
  isMinistryFormSubmitted: boolean = false;
  ministryDTO: DomainMinistryDTO = {
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

  countryList: CountryDTO[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private route: Router,
    private _configService: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllMinistries();
  }

  ministryForm = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(this._validationService.mobileNumberValidation())]],
    country: [null, Validators.required],
  });

  get f1() {
    return this.ministryForm.controls;
  }

  onClickMinistryCreate() {
    this.isAddEnabled = true;
  }

  editMinistry(ministry: DomainMinistryDTO) {
  }

  deleteMinistry(ministry: DomainMinistryDTO, position: string) {
  }

  setCountry(event: any) {
    this.ministryDTO.country = event.value;
  }

  onAddMinistrySubmit() {
    this.isMinistryFormSubmitted = true;
    if (this.ministryForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all required fields'});
      return;
    }
    this._mainService.saveMinistry(this.ministryDTO).subscribe((data: any) => {
      if (data['success'] === "SUCCESS") {
        this.isAddEnabled = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Ministry added successfully',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.isMinistryFormSubmitted = false;
            this.ministryForm.reset();
            this.ministryDTO = {
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
            this.getAllMinistries();
          }
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ministry not added'});
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
    });
  }

  getAllCountries() {
    this._mainService.getAllCountry().subscribe((data: Array<CountryDTO>) => {
      if (data.length > 0) {
        this.countryList = data;
      } else {
        this.isAddEnabled = false;
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this.isAddEnabled = false;
      if (error.status === 401) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'You will be logged out.'});
        this._configService.logOut();
      }
    });
  }

  getAllMinistries() {
    this.processing();
    this._mainService.getAllMinistry().subscribe((data: Array<DomainMinistryDTO>) => {
      if (data.length > 0) {
        this.ministries = data.reverse();
        Swal.close();
      } else {
        this.isAddEnabled = false;
        Swal.close();

      }
    }, error => {
      Swal.close();
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this.isAddEnabled = false;
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
