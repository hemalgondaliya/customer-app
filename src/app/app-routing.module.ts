import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {ListPage} from './list/list.page';
import {PaymentComponent} from './payment/payment.component';
import {EditmodelComponent} from './editmodel/editmodel.component';

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
    component: EditmodelComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
