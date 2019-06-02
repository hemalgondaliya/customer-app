import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {ListPage} from './list/list.page';
import {PaymentComponent} from './payment/payment.component';
import {EditModelComponent} from './edit-data/edit-model/edit-model.component';
import {DeliveryPersonComponent} from './delivery-person/delivery-person.component';
import {EditCustomerComponent} from './edit-data/edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    component: ListPage,
    pathMatch: 'full'
  },
  {
    path: 'customer',
    component: CustomerComponent,
    pathMatch: 'full'
  },
  {
    path: 'payment',
    component: PaymentComponent,
    pathMatch: 'full'
  },
  {
    path: 'editmodel',
    component: EditModelComponent,
    pathMatch: 'full'
  },
  {
    path: 'editcustomer',
    component: EditCustomerComponent,
    pathMatch: 'full'
  },
  {
    path: 'deliveryperson',
    component: DeliveryPersonComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
