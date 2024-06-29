import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeViewComponent} from "./employee-view/employee-view.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {EmployeeComponent} from "./employee.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children:
      [
        {
          path: '',
          component: EmployeeViewComponent,
        },
        {
          path: 'edit',
          component: EmployeeEditComponent,
        }
      ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
