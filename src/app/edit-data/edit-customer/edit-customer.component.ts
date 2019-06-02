import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../core/data.service';
import {ValidationService} from '../../core/validation.service';
import {AlertService} from '../../core/alert.service';


@Component({
    selector: 'edit-customer',
    templateUrl: 'edit-customer.component.html',
    styleUrls: ['edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {


    editCustomerForm: FormGroup;
    customer = null;
    enableRemove: boolean;

    constructor(private dataService: DataService, private validationService: ValidationService,
                private alertService: AlertService) {
        this.enableRemove = false;
    }

    ngOnInit(): void {
        this.editCustomerForm = new FormGroup({
            'billNumber': new FormControl(null, [Validators.required]),
            'year': new FormControl(null, [Validators.required])
        });
    }

    findCustomer() {
        this.dataService.searchCustomer({
            billNumber: this.editCustomerForm.get('billNumber').value,
            year: this.editCustomerForm.get('year').value
        }).subscribe(response => {
            this.customer = response;
            this.enableRemove = true;
        }, error => {
            this.alertService.presentAlert({header: error.error.error, message: error.error.message, buttons: ['OK']});
        });
    }


    onSubmit() {
        if (this.validationService.performValidation(this.editCustomerForm)) {
            this.dataService.deprecateCustomer(this.editCustomerForm.value).subscribe(response => {
                this.enableRemove = false;
                this.editCustomerForm.reset();
                this.customer = null;
                this.alertService.presentAlert({header: '', message: response.message, buttons: ['OK']});
            }, error => {
                this.alertService.presentAlert({header: error.error.error, message: error.error.message, buttons: ['OK']});
            });
        }

    }
}
