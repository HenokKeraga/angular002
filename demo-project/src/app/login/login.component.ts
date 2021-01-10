import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  constructor(private userService:UserService,private  router:Router) { }

  ngOnInit(): void {
  }


  logInUser() {
    this.userService.getAuthToken(this.username,this.password).subscribe((result: Array<any>)=>{
      if(result.length>0){
        this.userService.saveToken(result[0].token)
        console.log('token ', result[0].token)
        this.userService.getUserDetail(result[0].token).subscribe(loggedInUser=>{
          this.userService.userDetailsCache.next(loggedInUser[0])
          this.userService.saveUserDetail(loggedInUser)
          this.router.navigate(['list'])
        })

      }

      }

    )

  }
}
