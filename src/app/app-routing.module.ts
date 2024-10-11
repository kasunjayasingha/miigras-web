import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AccessDeniedComponent} from "./pages/access-denied/access-denied.component";
import {authGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {CountryComponent} from "./pages/country/country.component";
import {IncidentUserComponent} from "./pages/incident-user/incident-user.component";

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
    data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']},
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'country',
        component: CountryComponent,
        canActivate: [authGuard],
        data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
      },
      {
        path: 'ministry',
        loadChildren: () => import('./pages/ministry/ministry.module').then(m => m.MinistryModule),
        canActivate: [authGuard],
        data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
      },
      {
        path: 'agency',
        loadChildren: () => import('./pages/agency/agency.module').then(m => m.AgencyModule),
        canActivate: [authGuard],
        data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [authGuard],
        data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
      },
      {
        path: 'incidentUser/:incidentId',
        component: IncidentUserComponent,
        canActivate: [authGuard],
        data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
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
