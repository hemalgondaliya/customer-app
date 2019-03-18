import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {EventService} from '../core/event.service';
import {ListService} from '../list/list.service';

@Component({
    selector: 'customer-page',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

    customerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private eventService: EventService, private listService: ListService) {

    }

    ngOnInit() {
        this.customerForm = new FormGroup({
            'customername': new FormControl(null, [Validators.required]),
            'billno': new FormControl(null, [Validators.required]),
            'phonenumber': new FormControl(null, [Validators.required]),
            'item': new FormControl(null, [Validators.required]),
            'address': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        this.listService.addCustomer(this.customerForm.value);
        console.log(this.customerForm.value);
    }

}
