import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userDetail: any;
  @Output() onLogoutEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  userLogout(): void{
    this.onLogoutEvent.emit();
  }

  userLogIn() {

    this.userService.logout();

  }


  get showAfterLogin(): boolean {
    return this.userDetail && this.userDetail.token;
  }

  get hideAfterLogin(): boolean {
    return !this.userDetail || !this.userDetail.token;
  }

  get showIfAdmin(): boolean {
    return this.showAfterLogin && this.userDetail.roles.includes('admin');
  }


}
