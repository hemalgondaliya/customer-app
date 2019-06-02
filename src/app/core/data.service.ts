import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EventService} from './event.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Model} from '../modal/model';
import {LoadingController} from '@ionic/angular';


@Injectable()
export class DataService {

    deliveryPersonList: Array<String>;
    productModelList: Array<any>;
    applicationProperties: any;

    loading: any;

    requestApi = 'http://144.217.7.73:8080';

    // requestApi = 'http://localhost:8080';

    constructor(private eventService: EventService, private router: Router, private http: HttpClient, private authService: AuthService,
                private loadingController: LoadingController) {
        this.initLoading();
        this.eventService.on('loginSuccess').subscribe((data: any) => {
            this.initDeliveryPeople();
            this.initProductModels();
            this.initApplicationProperties();
        });
    }

    async initLoading() {
        this.loading = await this.loadingController.create({
            message: 'Please wait...'
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

    initApplicationProperties() {
        this.postApi('/user/app/properties', '').subscribe((response: Array<any>) => {
            this.applicationProperties = response;
        });
    }

    public getLogin(user: any): Observable<Object> {
        return this.postApi('/api/auth/signin', user);
    }

    public getPattern() {
        // TODO: Get all pattern from client config
        return new Map(Object.entries({
            'emailPattern': '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})',
            'namePattern': '[A-Za-z ]{2,32}',
            'billPattern': '[1-9][0-9]{0,3}',
            'bankNamePattern': '[A-Za-z ]{2,32}',
            'chequeNumberPattern': '[0-9]{6}',
            'amountPattern': '[1-9]\\d{2,6}$',
            'phonePattern': '^[6789]\\d{9}$',
        }));
    }

    public saveCustomer(cust: any): Observable<Object> {
        return this.postApi('/user/customer/save', cust);
    }

    public getCustomerList(): Observable<Object> {
        return this.postApi('/user/customer/list', null);
    }

    public getDeliveryPersons(): Array<String> {
        return this.deliveryPersonList;
    }

    public getProductModelList() {
        return this.productModelList;
    }

    public getPaymentMethods() {
        return this.applicationProperties.paymentMethods;
    }

    public addNewModel(model: Model) {
        return this.postApi('/user/model/add', model);
    }

    public deprecateModel(model: Model) {
        return this.postApi('/user/model/deprecate', model);
    }

    public deprecateCustomer(data: { billNumber: number, year: number }) {
        return this.postApi('/user/customer/deprecate', data);
    }

    public addPayment(data: any) {
        return this.postApi('/user/payment/add', data);
    }

    public addDeliveryPerson(data: any) {
        return this.postApi('/user/deliveryPerson/add', data);
    }

    public searchCustomer(data: any) {
        return this.postApi('/user/customer/find', data);
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
        this.loading.present();
        return this.http.post(this.requestApi + url, data, {
            params: params,
            observe: 'response'
        }).pipe(map((response: any) => {
            this.refreshToken(response.headers.get('x-auth'));
            this.loading.dismiss();
            this.initLoading();
            return response.body;
        }), catchError((err: any) => {
            this.loading.dismiss();
            this.initLoading();
            return throwError(err);
        }));
    }


}
