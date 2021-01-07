import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { IEmployee } from '../model/iemployee';
import { Observable } from 'rxjs';


@Injectable()
export class EmployeeService {
  url="http://localhost:3000/employee"

  constructor(private http:HttpClient) { }

  getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.url)
  }
}
