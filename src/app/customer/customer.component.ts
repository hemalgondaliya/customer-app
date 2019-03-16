import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
    selector: 'login-page',
    templateUrl: 'customer.html',
    styleUrls: ['customer.scss']
})
export class CustomerComponent implements OnInit {

    customerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.customerForm = new FormGroup({
            'customername': new FormControl(null, [Validators.required]),
            'billno': new FormControl(null, [Validators.required]),
            'phonenumber': new FormControl(null, [Validators.required]),
            'item': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
    }

}
