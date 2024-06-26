import { Component } from '@angular/core';
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miigras-web';
}

export const AUTENTICATION_URL_API = environment.AUTENTICATION_URL;
