import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DataService} from '../../core/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../modal/product';
import _ from 'lodash';
import {Const} from '../../core/const/Const';
import {AlertInfo} from '../../modal/alert-info.modal';
import {AlertService} from '../../core/alert.service';
import {ValidationService} from '../../core/validation.service';

const validationAlert: AlertInfo = {
    header: 'Incorrect data provided!',
    message: '',
    buttons: ['OK']
};

const duplicationAlert: AlertInfo = {
    header: 'Item is already added!',
    message: 'please select another item',
    buttons: ['OK']
};

@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit {

    @Input() selectedProducts: Product[];
    productForm: FormGroup;
    brandList: Array<string>;
    productModelList: Array<any>;
    selectedBrand: string;
    selectedModel: string;
    pattern: Map<string, string>;
    pricePattern: string;


    constructor(public modalController: ModalController,
                protected dataService: DataService,
                protected alertService: AlertService,
                protected validationService: ValidationService) {
        this.productModelList = dataService.getProductModelList();
        this.pattern = dataService.getPattern();
        this.brandList = Object.keys(this.productModelList);
        this.selectedProducts = [];
        this.pricePattern = this.pattern.get('amountPattern');
        this.selectedBrand = null;
        this.selectedModel = null;
    }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            'brand': new FormControl(null, [Validators.required]),
            'model': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required, Validators.pattern(this.pricePattern)]),
            'serialNumber': new FormControl(null, [Validators.required])
        });
    }

    async dismissModal() {
        await this.modalController.dismiss({
            'selectedProducts': this.selectedProducts
        });
        this.selectedProducts = [];
    }

    performValidation() {
        return this.validationService.performValidation(this.productForm, 'PRODUCT_PROPERTY_MAP');
    }

    onSave() {
        this.dismissModal();
    }

    onAdd() {
        if (this.performValidation()) {
            const product = new Product();
            product.model = this.productForm.value.model;
            product.serialNumber = this.productForm.value.serialNumber;
            product.price = this.productForm.value.price;
            if (!_.find(this.selectedProducts, product)) {
                this.selectedProducts.push(product);
            } else {
                this.alertService.presentAlert(duplicationAlert);
            }
        }
    }

    onRemove(product: Product) {
        _.remove(this.selectedProducts, product);
    }

    onReset() {
        this.productForm.get('model').reset();
        this.productForm.get('price').reset();
        this.productForm.get('serialNumber').reset();
    }

    onCancel() {
        this.selectedBrand = null;
        this.selectedModel = null;
        this.selectedProducts = [];
        this.dismissModal();
    }
}
