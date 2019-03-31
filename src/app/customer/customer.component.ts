import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {EventService} from '../core/event.service';
import {ListService} from '../list/list.service';
import {AlertInfo} from '../modal/alert-info.modal';
import {AlertService} from '../core/alert.service';
import {DataService} from '../core/data.service';

const successAlert: AlertInfo = {
    header: 'Customer is saved to Database!',
    message: 'Please check the list',
    buttons: ['OK']
};

const errorAlert: AlertInfo = {
    header: 'Erro while savind data!',
    message: '',
    buttons: ['OK']
};

@Component({
    selector: 'customer-page',
    templateUrl: 'customer.component.html',
    styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

    customerForm: FormGroup;

    deliveryPeoples: Array<String>;

    constructor(private formBuilder: FormBuilder, private eventService: EventService,
                private listService: ListService, private alertService: AlertService, private dataService: DataService) {
        this.deliveryPeoples = this.dataService.getDeliverPeople();
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
            'price': new FormControl(null, [Validators.required]),
            'deliveryPerson': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        this.dataService.saveCustomer(this.customerForm.value).subscribe((response: any) => {
            this.alertService.presentAlert(successAlert);
            this.customerForm.reset();
        }, (error: any) => {
            errorAlert.message = error.message;
            this.alertService.presentAlert(errorAlert);
        });
        console.log(this.customerForm.value);
    }


}
