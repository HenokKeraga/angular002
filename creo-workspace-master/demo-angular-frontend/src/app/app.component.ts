import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "./service/user.service";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // userName = 'Fekadu';

  userDetail: string;

  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  // // tslint:disable-next-line:typedef
  // onLogout(){
  //   this.router.navigate(['login']);
  //   console.log('User has logged out');
  // }

  ngOnInit() {
    this.userService.userDetailsCache.subscribe(userContext => {
      if (userContext) {
        this.userDetail = userContext;
      }
    });

    if (localStorage.getItem('creospan-user')) {
      this.userService.userDetailsCache.next(JSON.parse(localStorage.getItem('creospan-user')))
    }
  }

  logoutHandler() {
    this.userService.logOut();
  }
}
