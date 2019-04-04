import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EventService} from './event.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';


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

    constructor(private eventService: EventService, private router: Router, private http: HttpClient, private authService: AuthService) {
        this.eventService.on('loginSuccess').subscribe((data: any) => {
            this.initDeliveryPeople();
        });
    }

    initDeliveryPeople() {
        this.http.post(this.requestApi + '/user/deliveryPerson/getAll', null, this.httpOptions)
            .subscribe((response: Array<String>) => {
                this.deliveryPeoples = response;
            });
    }

    public getLogin(user: any): Observable<Object> {
        return this.postApi('/api/auth/signin', user);
    }

    public saveCustomer(cust: any): Observable<Object> {
        return this.postApi('/user/customer/save', cust);
    }

    public getCustomerList(): Observable<Object> {
        return this.http.post(this.requestApi + '/user/customer/list', null, this.httpOptions);
    }

    public getDeliverPeople(): Array<String> {
        return this.deliveryPeoples;
    }

    refreshToken(token: string) {
        this.authService.setAuthToken(token);
        this.eventService.emit('token.refresh', token);
    }

    getApi(url: string, params?: HttpParams, responseType?: any) {
        return this.http.get(this.requestApi + url, {
            params: params,
            observe: 'response',
            responseType: responseType
        }).pipe(
            map((response: any) => {
                this.refreshToken(response.headers.get('x-auth'));

                // this.checkResponseCode(response.body);
                return response.body;
            }), catchError((err: any) => {
                return throwError(err);
            }));
    }

    postApi(url: string, data: any, params?: HttpParams) {
        return this.http.post(this.requestApi + url, data, {
            params: params,
            observe: 'response'
        }).pipe(map((response: any) => {
            this.refreshToken(response.headers.get('x-auth'));

            return response.body;
        }), catchError((err: any) => {
            return throwError(err);
        }));
    }


}
