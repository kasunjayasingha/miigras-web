import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AppLayoutModule} from "./layout/app.layout.module";
import {PasswordModule} from "primeng/password";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationService, MessageService} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {ChartModule} from "primeng/chart";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {AccessDeniedComponent} from './pages/access-denied/access-denied.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AccessTokenInterceptorService} from "./service/access-token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccessDeniedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    PasswordModule,
    ReactiveFormsModule,
    NgbModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ChartModule,
    MenuModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
