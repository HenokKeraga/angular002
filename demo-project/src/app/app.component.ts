import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./service/user.service";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userDetail:string;


  constructor(private userService:UserService,private cookieService:CookieService) {
  }

  ngOnInit(): void {

    this.userService.userDetailsCache.subscribe(userContext=>{
      this.userDetail=userContext
    })

    console.log((this.userDetail))

    if (localStorage.getItem('c-user')){
      this.userService.userDetailsCache.next(JSON.parse(localStorage.getItem('c-user')))
    }
  }

  logoutUser(): void {
  this.userService.logout()
  }

}
