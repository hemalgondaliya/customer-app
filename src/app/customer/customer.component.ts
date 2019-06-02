import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {EventService} from '../core/event.service';
import {ListService} from '../list/list.service';
import {AlertInfo} from '../modal/alert-info.modal';
import {AlertService} from '../core/alert.service';
import {DataService} from '../core/data.service';
import {ModalController} from '@ionic/angular';
import {ProductComponent} from './product/product.component';
import {Product} from '../modal/product';
import {ValidationService} from '../core/validation.service';

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

const validationAlert: AlertInfo = {
    header: 'Incorrect data provided!',
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

    selectedProducts: Product[];

    // ** Validation attributes ** //
    pattern: Map<string, string>;
    emailPattern: string;
    namePattern: string;
    billPattern: string;
    phonePattern: string;
    minDate: string;
    maxDate: string;


    constructor(private formBuilder: FormBuilder, private eventService: EventService,
                private listService: ListService, private alertService: AlertService,
                private dataService: DataService, private modalController: ModalController,
                private validationService: ValidationService) {
        this.deliveryPeoples = this.dataService.getDeliveryPersons();
        this.pattern = dataService.getPattern();
        this.selectedProducts = [];
        this.emailPattern = this.pattern.get('emailPattern');
        this.namePattern = this.pattern.get('namePattern');
        this.billPattern = this.pattern.get('billPattern');
        this.phonePattern = this.pattern.get('phonePattern');
        this.maxDate = new Date().getFullYear() + 1 + '-0' + new Date().getMonth().toString().slice(-2) + '-' + new Date().getDate();
        this.minDate = new Date().getFullYear() + '-0' + new Date().getMonth().toString().slice(-2) + '-' + new Date().getDate();

    }

    ngOnInit() {
        this.customerForm = new FormGroup({
            'firstName': new FormControl(null, [Validators.required, Validators.pattern(this.namePattern)]),
            'lastName': new FormControl(null, [Validators.required, Validators.pattern(this.namePattern)]),
            'referenceName': new FormControl(null, [Validators.pattern(this.namePattern)]),
            'billNumber': new FormControl(null, [Validators.required, Validators.pattern(this.billPattern)]),
            'date': new FormControl(null, [Validators.required]),
            'selectedProducts': new FormControl(null, []),
            'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
            'secondNumber': new FormControl(null, [Validators.pattern(this.phonePattern)]),
            'address': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.pattern(this.emailPattern)]),
            'deliveryPerson': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        if (this.performValidation()) {
            this.customerForm.value.selectedProducts = this.selectedProducts;
            this.dataService.saveCustomer(this.customerForm.value).subscribe((response: any) => {
                this.alertService.presentAlert(successAlert);
                this.customerForm.reset();
            }, (error: any) => {
                errorAlert.message = error.error.message;
                this.alertService.presentAlert(errorAlert);
            });
            console.log(this.customerForm.value);
        }
    }

    performValidation() {
        let validation = this.validationService
            .performValidation(this.customerForm, 'CUSTOMER_PROPERTY_MAP');
        if (this.selectedProducts.length <= 0 && validation) {
            validationAlert.message = 'Please select product';
            this.alertService.presentAlert(validationAlert);
            validation = false;
        }
        return validation;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ProductComponent,
            componentProps: {selectedProducts: this.selectedProducts}
        });
        modal.onDidDismiss().then(function (data) {
            this.selectedProducts = data.data.selectedProducts;
        }.bind(this));
        return await modal.present();
    }

    openSelectItemModal() {
        this.presentModal();
    }


}
