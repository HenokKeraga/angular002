import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {
  }


  // tslint:disable-next-line:typedef
  getEmployeeList() {
    return this.http.get(this.baseUrl);
  }

  addEmployee(employee) {
    return this.http.post(this.baseUrl, employee);
  }

  getEmployeeById(employeeId: string) {
    return this.http.get(`${this.baseUrl}/${employeeId}`);
  }

  updateEmployee(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}

