import {Component, ElementRef, ViewChild} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  items!: MenuItem[];

  positiontop: string = '';

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private userService: UserService,
  ) {
  }

  logout(position: string) {
    this.positiontop = position;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.logout().subscribe(result => {
          sessionStorage.clear();
          window.location.href = '/login';
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error while logging out'});
        });

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
      key: 'positionDialog2'
    });


  }
}
