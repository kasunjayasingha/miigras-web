import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ValidationHandlerService} from "../../../service/validation-handler.service";
import {FormBuilder} from "@angular/forms";
import {MainService} from "../../../service/main.service";
import {ConfigService} from "../../../service/config.service";
import {Router} from "@angular/router";
import {AgencyDTO} from "../../../model/AgencyDTO";
import Swal from "sweetalert2";

@Component({
  selector: 'app-agency-view',
  templateUrl: './agency-view.component.html',
  styleUrls: ['./agency-view.component.scss']
})
export class AgencyViewComponent implements OnInit {

  position: string = '';
  agencies: Array<AgencyDTO> = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _mainService: MainService,
    private _configService: ConfigService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllAgencies();
  }

  editAgency(agency: AgencyDTO) {
  }

  deleteAgency(agency: AgencyDTO, position: string) {
  }

  private getAllAgencies() {
    this.processing();
    this._mainService.getAllAgency().subscribe((res: Array<AgencyDTO>) => {
      if (res != null) {
        this.agencies = res;
        Swal.close();
      } else {
        this._mainService.isAddEnabled = false;
        Swal.close();
      }
    }, error => {
      Swal.close();
      this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.error});
      this._mainService.isAddEnabled = false;
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
