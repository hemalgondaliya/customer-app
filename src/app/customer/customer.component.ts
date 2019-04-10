import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {EventService} from '../core/event.service';
import {ListService} from '../list/list.service';
import {AlertInfo} from '../modal/alert-info.modal';
import {AlertService} from '../core/alert.service';
import {DataService} from '../core/data.service';
import {ModalController} from '@ionic/angular';
import {ProductComponent} from './product/product.component';
import {Const} from '../core/const/Const';
import _ from 'lodash';

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
    productModelList: Array<String>;
    productBrandList: Array<String>;

    selectedProduct: any;

    // ** Validation attributes ** //
    emailPattern: string;
    namePattern: string;
    billPattern: string;
    phonePattern: string;
    minDate: string;
    maxDate: string;


    constructor(private formBuilder: FormBuilder, private eventService: EventService,
                private listService: ListService, private alertService: AlertService,
                private dataService: DataService, private modalController: ModalController) {
        this.deliveryPeoples = this.dataService.getDeliverPeople();
        this.productModelList = this.dataService.getProductModelList();
        this.productBrandList = this.dataService.getProductBrandList();
        this.selectedProduct = {};
        this.emailPattern = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
        this.namePattern = '[A-Za-z]{2,32}';
        this.billPattern = '[1-9][0-9]{0,3}';
        this.phonePattern = '^[789]\\d{9}$';
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
            'productModel': new FormControl(null, []),
            'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
            'address': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.pattern(this.emailPattern)]),
            'deliveryPerson': new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        if (this.performValidation()) {
            this.customerForm.value.productModel = this.selectedProduct;
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
        let validation = true;
        _.forEach(_.keysIn(this.customerForm.value), (key: string) => {
            if (!this.customerForm.get(key).valid && validation) {
                validationAlert.message = 'Please provide valid ' + Const.CUSTOMER_PROPERTY_MAP[key];
                this.alertService.presentAlert(validationAlert);
                validation = false;
            }
        });
        return validation;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ProductComponent,
            componentProps: {customerForm: this.customerForm}
        });
        modal.onDidDismiss().then(function (data) {
            this.selectedProduct = data.data.selectedProduct;
        }.bind(this));
        return await modal.present();
    }

    openSelectItemModal() {
        this.presentModal();
    }


}
