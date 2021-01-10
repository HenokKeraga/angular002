import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, Router} from "@angular/router";
import {IEmployee} from "../model/iemployee";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId:string;
  employee:any;

  constructor(private  employeeService: EmployeeService, private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute ,private router:Router) {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      address: [''],
      mobile : [''],
      email : ['']
    });

  }

  ngOnInit(): void {
    this.employeeId=this.activatedRoute.snapshot.params.id;

    if(this.employeeId){

      this.employeeService.getEmployeesById(this.employeeId).subscribe(result=>{

        this.employeeForm = this.formBuilder.group({
          name: [result['name']],
          address: [result['address']],
          mobile : [result['mobile']],
          email : [result['email']]
        });

      });
    }

  }


  addEmployee(): void {
   if(this.employeeId) {
     this.employeeService.updateEmployee(this.employeeId,this.employeeForm.value).subscribe(res=>{
       console.log(res)

     });

   }else {
     this.employeeService.addEmployee(this.employeeForm.value).subscribe(res => {
       console.log(res);
     });
   }
    this.router.navigate(['/list'])

  }
}
