import {Component, OnInit} from '@angular/core';
import {EventService} from '../core/event.service';
import {Router} from '@angular/router';

import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginComponent implements OnInit {
    isLoggedIn = false;
    constructor(private eventService: EventService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
    }

    
    logIn() {
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };

        const loginData = {
            "id": 0,
            "name": "Hemal",
            "password": "Hemal@123"
          }
        this.http.post("http://localhost:8080/user/login",loginData,httpOptions)
        .subscribe((response: any) => {
        console.log('First Http response:' + response);
        });
        this.isLoggedIn = true;
        this.eventService.emit('loginSuccess', true);
        this.router.navigateByUrl('home');
    }
}
