import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees: any;

  constructor(private appService: EmployeeService) {
  }

  ngOnInit(): void {
    this.appService.getEmployeeList().subscribe((result) => {
      this.employees = result;
      console.log(this.employees);
    });
  }

  // tslint:disable-next-line:typedef
  deleteEmployee(id){

  }
}
