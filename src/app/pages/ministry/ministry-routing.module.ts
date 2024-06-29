import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MinistryComponent} from "./ministry.component";

const routes: Routes = [
  {
    path: '',
    component: MinistryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistryRoutingModule {
}
