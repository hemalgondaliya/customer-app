import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EventService} from './event.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Model} from '../modal/model';


@Injectable()
export class DataService {

    deliveryPersonList: Array<String>;
    productModelList: Array<any>;
    productBrandList: Array<String>;

    // requestApi = 'http://144.217.7.73:8080';

    requestApi = 'http://localhost:8080';

    constructor(private eventService: EventService, private router: Router, private http: HttpClient, private authService: AuthService) {
        this.eventService.on('loginSuccess').subscribe((data: any) => {
            this.initDeliveryPeople();
            this.initProductModels();
            this.initProductBrand();
        });
    }

    initDeliveryPeople() {
        this.postApi('/user/deliveryPerson/getAll', null)
            .subscribe((response: Array<String>) => {
                this.deliveryPersonList = response;
            });
    }

    initProductModels() {
        this.postApi('/user/model/all', '').subscribe((response: Array<any>) => {
            this.productModelList = response;
        });
    }

    initProductBrand() {
        // TODO: Get all brand from http request
        this.productBrandList = ['SONY', 'SAMSUNG', 'LG'];
    }

    public getLogin(user: any): Observable<Object> {
        return this.postApi('/api/auth/signin', user);
    }

    public saveCustomer(cust: any): Observable<Object> {
        return this.postApi('/user/customer/save', cust);
    }

    public getCustomerList(): Observable<Object> {
        return this.postApi('/user/customer/list', null);
    }

    public getDeliverPeople(): Array<String> {
        return this.deliveryPersonList;
    }

    public getProductModelList() {
        return this.productModelList;
    }

    public getProductBrandList() {
        return this.productBrandList;
    }

    public addNewModel(model: Model) {
        return this.postApi('/user/model/add', model);
    }

    public deprecateModel(model: Model) {
        return this.postApi('/user/model/deprecate', model);
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
