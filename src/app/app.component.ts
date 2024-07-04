import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment.development";
import {ConfigService} from "./service/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'miigras-web';

  constructor(private configService: ConfigService) { }

  ngOnInit() {

  }


}

export const AUTENTICATION_URL_API = environment.AUTENTICATION_URL;
export const MAIN_URL = environment.MAIN_URL;
export const REGISTRATION_URL = environment.REGISTRATION_URL;
