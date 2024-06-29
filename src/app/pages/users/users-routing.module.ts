import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {authGuard} from "../../guards/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {EmployeeViewComponent} from "./employee/employee-view/employee-view.component";
import {EmployeeEditComponent} from "./employee/employee-edit/employee-edit.component";

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard],
    data: {expectedRole: ['ADMIN', 'SUPER_ADMIN']}
  },
  {
    path: 'employee',
    children: [
      {
        path: '',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
