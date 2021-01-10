import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {CookieModule} from "ngx-cookie";
import {LoggingInterceptor} from "./intercepter/logging.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListComponent,
    AddEmployeeComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule, HttpClientModule, ReactiveFormsModule,FormsModule,CookieModule.forRoot()],
  providers: [EmployeeService,{provide:HTTP_INTERCEPTORS,useClass:LoggingInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
