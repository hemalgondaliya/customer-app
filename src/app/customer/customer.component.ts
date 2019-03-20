import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {EventService} from '../core/event.service';
import {ListService} from '../list/list.service';
import {AlertInfo} from '../modal/alert-info.modal';
import {AlertService} from '../core/alert.service';
import {DataService} from '../core/data.service';

@Component({
    selector: 'customer-page',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

    customerForm: FormGroup;

    onCancle: Function;

    constructor(private formBuilder: FormBuilder, private eventService: EventService,
                private listService: ListService, private alertService: AlertService, private dataService: DataService) {
    }

    ngOnInit() {
        this.customerForm = new FormGroup({
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required]),
            'referenceName': new FormControl(null, [Validators.required]),
            'billNumber': new FormControl(null, [Validators.required]),
            'date': new FormControl(null, [Validators.required]),
            'item': new FormControl(null, [Validators.required]),
            'phoneNumber': new FormControl(null, [Validators.required]),
            'address': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        // this.alertService.presentAlertConfirm('', '', this.onCancel);

        const alertMessage: AlertInfo = {
            header: 'Customer is added!',
            message: 'Please check the list',
            buttons: ['OK']
        };
        this.dataService.saveCustomer(this.customerForm.value).subscribe((response: any) => {
            console.log(response);
        }, (error: any) => {
            console.log('customer save error: ');
        });
        this.listService.addCustomer(this.customerForm.value);
        console.log(this.customerForm.value);

        this.alertService.presentAlert(alertMessage);
        this.customerForm.reset();
    }


}
