import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryDTO} from "../../model/CountryDTO";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MainService} from "../../service/main.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  countries: CountryDTO[] = [];
  countryDTO: CountryDTO = {
    id: 0,
    name: '',
    code: '',
    ntpTime: ''
  }
  position: string = '';
  isAddEnabled: boolean = false;
  isCountryformSubmitted: boolean = false;
  countryCount: number = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _configService: ConfigService,
    private route: Router,) {
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  countryForm = this.formBuilder.group({
    name: [null, Validators.required],
    ntp: [null, Validators.required],
    code: [null, [Validators.required, Validators.pattern(this._validationService.countryCodeValidation())]]
  });

  get f1() {
    return this.countryForm.controls;
  }

  onClickCountryCreate() {
    this.isAddEnabled = true;
  }

  editCountry(country: CountryDTO) {
  }

  deleteCountry(country: CountryDTO, position: string) {
    this.position = position;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this country?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCountryById(country);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      },
      key: 'positionDialog'
    });

  }

  deleteCountryById(country: CountryDTO) {
    this._mainService.deleteCountry(country.id).subscribe((data: any) => {
      if (data['success'] === "SUCCESS") {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country deleted successfully'});
        this.getAllCountries();
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Country not deleted'});
      }
    }, error => {
      // console.log(error)
      if (error.status === 403) {
        this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Country is in use, cannot delete'});
        return;
      }
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this._configService.handleError(error);
    });
  }

  onAddCountrySubmit() {
    this.isCountryformSubmitted = true;
    if (this.countryForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill all the fields'});
      return;
    }
    this._mainService.checkCountryIsExist(this.countryDTO.code, this.countryDTO.name).subscribe((data: any) => {
      if (data['success'] === "SUCCESS") {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Country already exist'});
        return;
      } else {
        this._mainService.saveCountry(this.countryDTO).subscribe((data: any) => {
          if (data['success'] === "SUCCESS") {
            // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Country added successfully'});
            this.isAddEnabled = false;
            Swal.fire({
              title: 'Country added successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.isCountryformSubmitted = false;
                this.countryForm.reset();
                this.countryDTO = {
                  id: 0,
                  name: '',
                  code: '',
                  ntpTime: ''
                };
                this.getAllCountries();
              }
            });
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Country not added'});
          }
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
          if (error.status === 403) {
            Swal.fire({
              title: 'Your session has expired. Please login again.',
              icon: 'error',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this._configService.logOut();
              }
            });
          }
        });
      }
    });


  }

  getAllCountries() {
    this.processing();
    this._mainService.getAllCountry().subscribe((data: Array<CountryDTO>) => {
      if (data.length > 0) {
        this.countries = data;
        this.countryCount = data.length;
        Swal.close();
      } else {
        Swal.close();
      }
    }, error => {
      Swal.close();
      console.log(error)
      if (error.status === 403) {
        Swal.fire({
          title: 'Your session has expired. Please login again.',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this._configService.logOut();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
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
