import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

import {Subject} from 'rxjs';
import {EventService} from './event.service';

@Injectable()
export class AuthService {

  loggedIn: boolean;
  loginUrl: string;
  homeUrl: string;
  xAuthKey: string;
  loading: boolean;
  expiredMsg: string;

  loggedInChange: Subject<boolean> = new Subject<boolean>();
  loadingChange: Subject<boolean> = new Subject<boolean>();
  expiredMsgChange: Subject<string> = new Subject<string>();

  constructor(private router: Router, private eventService: EventService) {
    this.loginUrl = '/';
    this.homeUrl = '/home';
    this.xAuthKey = 'x-auth';
    this.loading = false;
    this.expiredMsg = '';
    this.loggedIn = true;
  }

  logout() {
    this.loading = true;
    this.loadingChange.next(this.loading);
    this.loggedIn = false;
    this.loggedInChange.next(this.loggedIn);
    this.expiredMsg = 'You are being logged out...';
    this.expiredMsgChange.next(this.expiredMsg);
    localStorage.clear();
    this.redirectToLogin();
  }

  handleTokenExpired(error: any) {
    console.error(error.message);
    this.loggedIn = false;
    this.loggedInChange.next(this.loggedIn);
    this.expiredMsg = 'You are being logged out due to inactivity. Please login again.';
    this.expiredMsgChange.next(this.expiredMsg);
    this.redirectToLogin();
  }

  redirectToLogin() {
    this.eventService.emit('logout', new Error(this.expiredMsg));
    this.router.navigateByUrl(this.loginUrl);
  }

  setAuthToken(token: string) {
    localStorage.clear();
    localStorage.setItem(this.xAuthKey, token);
  }

  getAuthToken() {
    return localStorage.getItem(this.xAuthKey);
  }

  addTokenHttpHeader() {
    const tokenType = 'Bearer ';
    const token: string = tokenType + this.getAuthToken();
    const headers: HttpHeaders = (token != null) ? (new HttpHeaders(
      {'x-auth': token}
    )) : new HttpHeaders();
    return headers;
  }

}
