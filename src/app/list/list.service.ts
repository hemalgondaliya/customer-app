import {Injectable} from '@angular/core';
import {Customer} from '../modal/customer';

@Injectable()
export class ListService {

    private tempCustomerList: Array<Customer> = new Array<Customer>();

    public addCustomer(cust: Customer) {
        this.tempCustomerList.push(cust);
    }

    public getCustomerList() {
        return this.tempCustomerList;
    }

    public getList(): boolean {
        return true;
    }


}
