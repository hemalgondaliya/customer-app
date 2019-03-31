import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventService} from './event.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Customer} from '../modal/customer';
import {map} from 'rxjs/operators';


@Injectable()
export class DataService {

    deliveryPeoples: Array<String>;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    requestApi = 'http://144.217.7.73:8080';

    // requestApi = 'http://localhost:8080';

    constructor(private eventService: EventService, private router: Router, private http: HttpClient) {
        this.initDeliveryPeople();
    }

    initDeliveryPeople() {
        this.http.post(this.requestApi + '/user/deliveryPerson/getAll', null, this.httpOptions)
            .subscribe((response: Array<String>) => {
                this.deliveryPeoples = response;
            });
    }

    public getLogin(user: any): Observable<Object> {
        return this.http.post(this.requestApi + '/api/auth/signin', user, this.httpOptions);
    }

    public saveCustomer(cust: any): Observable<Object> {
        return this.http.post(this.requestApi + '/user/customer/save', cust, this.httpOptions).pipe(map(this.responseHandler));
    }

    public getCustomerList(): Observable<Object> {
        return this.http.post(this.requestApi + '/user/customer/list', null, this.httpOptions);
    }

    public getDeliverPeople(): Array<String> {
        return this.deliveryPeoples;
    }

    private responseHandler(response: any) {
        if (response.statusCode === 200) {
            return response;
        }
    }

}
