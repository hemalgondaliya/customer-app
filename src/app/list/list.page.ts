import { Component, OnInit } from '@angular/core';
import { Customer } from '../modal/customer';
import { EventService } from '../core/event.service';
import {ListService} from './list.service';
import {ModalController} from '@ionic/angular';
import {CustomerSingleComponent} from './customer-single/customer-single.component';
import {DataService} from '../core/data.service';
import _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  public customers: Array<Customer>;

  constructor(private eventService: EventService, private listService: ListService,
              private modalController: ModalController, private dataService: DataService) {
    this.dataService.getCustomerList().subscribe((response: Array<Customer>) => {
      this.customers = _.unionBy(this.listService.getCustomerList(), response, 'billNumber');
    }, (error: any) => {
      this.customers = this.listService.getCustomerList();
    });
  }

  ngOnInit() {
    this.eventService.on('customer.inserted').subscribe((customer: Customer) => {
      this.customers.push(customer);
    });
  }

  async presentModal(cust: Customer) {
    const modal = await this.modalController.create({
      component: CustomerSingleComponent,
      componentProps: {customer: cust}
    });
    return await modal.present();
  }

  onCustSelect(cust: Customer) {
    this.presentModal(cust);
  }
}
