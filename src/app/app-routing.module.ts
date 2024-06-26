import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";
import {authGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {CountryComponent} from "./pages/country/country.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'miigras-web',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    data: {expectedRole: ['ADMIN', 'USER']},
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'country',
        component: CountryComponent
      }
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
