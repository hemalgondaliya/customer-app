import { Component, OnInit } from '@angular/core';
import { Customer } from '../modal/customer';
import { EventService } from '../core/event.service';
import {ListService} from './list.service';
import {ModalController} from '@ionic/angular';
import {CustomerSingleComponent} from './customer-single/customer-single.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  public customers: Array<Customer>;
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(private eventService: EventService, private listService: ListService, public modalController: ModalController) {
    this.customers = this.listService.getCustomerList();
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
