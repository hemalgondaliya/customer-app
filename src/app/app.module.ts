import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomerSingleComponent} from './list/customer-single/customer-single.component';
import {ListPage} from './list/list.page';
import {EventService} from './core/event.service';
import {DataService} from './core/data.service';
import {AlertService} from './core/alert.service';
import {ListService} from './list/list.service';
import {CustomerService} from './customer/customer.service';
import {AuthService} from './core/auth.service';
import {ValidationService} from './core/validation.service';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {ProductComponent} from './customer/product/product.component';
import {PaymentComponent} from './payment/payment.component';
import {EditModelComponent} from './edit-data/edit-model/edit-model.component';
import {DeliveryPersonComponent} from './delivery-person/delivery-person.component';
import {EditCustomerComponent} from './edit-data/edit-customer/edit-customer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CustomerComponent,
        ListPage,
        CustomerSingleComponent,
        ProductComponent,
        PaymentComponent,
        EditModelComponent, DeliveryPersonComponent, EditCustomerComponent],
    entryComponents: [CustomerSingleComponent, ProductComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        EventService,
        DataService, {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        AlertService,
        ListService,
        CustomerService,
        AuthService,
        ValidationService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
