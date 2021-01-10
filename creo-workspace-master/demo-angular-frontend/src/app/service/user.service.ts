import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetailsCache: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  USER_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  registerUser(data) {
    return this.http.post(this.USER_URL, data);
  }

  // tslint:disable-next-line:typedef
  getAuthToken(email: string, password: string) {
    // in reality it should only return Json token based on the email/password.
    // I'm passing dummy token so that this route can be ignored in interceptor.
    return this.http.get(`${this.USER_URL}?user=${email}&password=${password}`, {headers: {Anonymous: 'undefined'}});
  }

  // tslint:disable-next-line:typedef
  getUserDetail(token) {
    return this.http.get(`${this.USER_URL}?token=${token}`);
  }

  isLogin(): boolean {
    return !!this.cookieService.get('creospan-token');
  }

  // tslint:disable-next-line:typedef
  getUserRoles() {
    return this.userDetailsCache.getValue().roles;
  }

  // tslint:disable-next-line:typedef
  public saveUserDetail(loginedInUser) {
    localStorage.setItem('creospan-user', JSON.stringify(loginedInUser[0]));
  }

  // tslint:disable-next-line:typedef
  public saveToken(token) {
    if (token) {
      this.cookieService.put('creospan-token', token);
    }
  }

  // tslint:disable-next-line:typedef
  public logOut() {
    this.userDetailsCache.next({});
    this.cookieService.removeAll();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
