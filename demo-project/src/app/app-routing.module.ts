import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent,canActivate:[AuthGuard] },
  {path: 'add', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  {path: 'add/:id', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
