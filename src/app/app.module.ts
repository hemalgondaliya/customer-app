import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {EventService} from './core/event.service';
import {DataService} from './core/data.service';
import {AlertService} from './core/alert.service';

@NgModule({
    declarations: [AppComponent, LoginComponent, CustomerComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
      HttpClientModule,
    IonicModule.forRoot(),
      AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EventService,
      DataService,
      AlertService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
