import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IEmployee } from '../model/iemployee';
import { Observable } from 'rxjs';


@Injectable()
export class EmployeeService {
  url = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.url);
  }

  addEmployee(value: any): Observable<any> {
    return  this.http.post(this.url, value);
  }

  getEmployeesById(employeeId: string) {
    return this.http.get(`${this.url}/${employeeId}`)

  }

  updateEmployee(employeeId: string, value: any) {

    return  this.http.put(`${this.url}/${employeeId}`, value);
  }
}
