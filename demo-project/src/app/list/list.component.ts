import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../model/iemployee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  employees: IEmployee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe((res) => (this.employees = res));
  }
}
