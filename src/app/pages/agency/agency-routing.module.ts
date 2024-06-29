import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgencyComponent} from "./agency.component";
import {AgencyViewComponent} from "./agency-view/agency-view.component";
import {AgencyEditComponent} from "./agency-edit/agency-edit.component";

const routes: Routes = [
  {
    path: '',
    component: AgencyComponent,
    children: [
      {
        path: '',
        component: AgencyViewComponent,
      },
      {
        path: 'edit',
        component: AgencyEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule {
}
