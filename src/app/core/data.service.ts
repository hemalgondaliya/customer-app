import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventService} from './event.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Customer} from '../modal/customer';


@Injectable()
export class DataService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    requestApi = 'http://localhost:8080';

    constructor(private eventService: EventService, private router: Router, private http: HttpClient) {
    }

    public getLogin(user: any): Observable<Object> {
        return this.http.post(this.requestApi + '/user/login', user, this.httpOptions);
    }

    public saveCustomer(cust: any): Observable<Object> {
        return this.http.post(this.requestApi + '/user/customer/save', cust, this.httpOptions);
    }

}
