import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent {

  constructor(private router: Router) {
  }

  route = sessionStorage.getItem('CURRENT_ROUTE') || '/';

  redirectTo() {
    this.router.navigate([this.route]);
  }

}
