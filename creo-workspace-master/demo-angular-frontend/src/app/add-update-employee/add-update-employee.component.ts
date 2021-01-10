import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css']
})
export class AddUpdateEmployeeComponent implements OnInit {
  employeeFormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl('')
  });

  employeeId: string;

  constructor(private appService: EmployeeService, private activatedRoute: ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params.id;
    if (this.employeeId) {
      this.appService.getEmployeeById(this.employeeId).subscribe((result) => {
        this.employeeFormGroup = new FormGroup({
          name: new FormControl(result['name']),
          address: new FormControl(result['address']),
          mobile: new FormControl(result['mobile']),
          email: new FormControl(result['email'])
        });
      });
    }
  }

  // tslint:disable-next-line:typedef
  addEmployee() {
    if (this.employeeId) {
      this.appService.updateEmployee(this.employeeId, this.employeeFormGroup.value).subscribe((result) => {
        console.log("Updating employee info");
        this.router.navigate(['list']);
      });
    } else {
      this.appService.addEmployee(this.employeeFormGroup.value).subscribe((result) => {
        console.log('Employee has been added.');
      });
    }
  }
}
