import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../list/list.service';
import {AlertService} from '../core/alert.service';
import {DataService} from '../core/data.service';
import {ValidationService} from '../core/validation.service';
import {AlertInfo} from '../modal/alert-info.modal';

const successAlert: AlertInfo = {
    header: 'Delivery person is saved to Database!',
    message: '',
    buttons: ['OK']
};

const errorAlert: AlertInfo = {
    header: 'Erro while savind data!',
    message: '',
    buttons: ['OK']
};

@Component({
    selector: 'delivery-person',
    templateUrl: 'delivery-person.component.html',
    styleUrls: ['delivery-person.component.scss']
})
export class DeliveryPersonComponent implements OnInit {

    deliveryPersonForm: FormGroup;

    deliveryPersons: Array<String>;
    phonePattern: string;
    namePattern: string;

    constructor(private formBuilder: FormBuilder,
                private listService: ListService,
                private alertService: AlertService,
                private dataService: DataService,
                private validationService: ValidationService) {
        this.deliveryPersons = this.dataService.getDeliveryPersons();
        this.phonePattern = '^[6789]\\d{9}$';
        this.namePattern = '[A-Za-z ]{2,32}';
    }

    ngOnInit(): void {
        this.deliveryPersonForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.pattern(this.namePattern)]),
            'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
            'address': new FormControl(null, [Validators.required]),
            'tempoNumber': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        if (this.performValidation()) {
            this.dataService.addDeliveryPerson(this.deliveryPersonForm.value).subscribe((response: any) => {
                this.alertService.presentAlert(successAlert);
                this.deliveryPersons.push(this.deliveryPersonForm.get('name').value);
                this.deliveryPersonForm.reset();
            }, (error: any) => {
                errorAlert.message = error.error.message;
                this.alertService.presentAlert(errorAlert);
            });
            console.log(this.deliveryPersonForm.value);
        }
    }

    performValidation() {
        return this.validationService
            .performValidation(this.deliveryPersonForm, 'DELIVERY_PERSON_MAP');
    }
}
