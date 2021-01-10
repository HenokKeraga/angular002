import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users'
  userDetailsCache: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient  ,private cookieService:CookieService,private  router: Router) {
  }

  getAuthToken(username: any, password: any) {

    return this.http.get(`${this.url}?user=${username}&password=${password}`)
  }

  saveToken(token: any) {
    if(token){
      this.cookieService.put('c-token',token)
    }

  }

  getUserDetail(token: any) {

    return this.http.get(`${this.url}?token=${token}`)

  }

  saveUserDetail(logedInuser: Object) {
    localStorage.setItem('c-user', JSON.stringify(logedInuser))
  }

  logout() {
    this.userDetailsCache.next({})
    this.cookieService.removeAll()
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  isLogin(): boolean {
    return !!this.cookieService.get('c-token');
  }

  // tslint:disable-next-line:typedef
  getUserRoles() {
    return this.userDetailsCache.getValue().roles;
  }
}
