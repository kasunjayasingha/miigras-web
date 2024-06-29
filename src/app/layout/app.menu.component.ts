import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/miigras-web']}
        ]
      },
      {
        label: 'Main',
        items: [
          {label: 'Country', icon: 'pi pi-fw pi-globe', routerLink: ['country']},
          {label: 'Ministry', icon: 'pi pi-fw pi-briefcase', routerLink: ['ministry']},
          {label: 'Agency', icon: 'pi pi-fw pi-users', routerLink: ['agency']},
          {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
              {label: 'User', icon: 'pi pi-fw pi-user-plus', routerLink: ['users/user']},
              {label: 'Employee', icon: 'pi pi-fw pi-users', routerLink: ['users/employee']}
            ]
          }


        ]
      },
    ];
  }
}
