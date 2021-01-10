import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {AddUpdateEmployeeComponent} from './add-update-employee/add-update-employee.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from './guard/admin.guard';

export const routes: Route[] = [
  {component: HomeComponent, path: ''},
  {component: ListComponent, path: 'list', canActivate: [AuthGuard]},
  {component: AddUpdateEmployeeComponent, path: 'add', canActivate: [AuthGuard]},
  {component: AddUpdateEmployeeComponent, path: 'add/:id', canActivate: [AuthGuard]},
  {component: LoginComponent, path: 'login'},
  {component: AdminComponent, path: 'admin', canActivate: [AuthGuard, AdminGuard]},
];
