import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DataService} from '../../core/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../modal/product';
import _ from 'lodash';
import {AlertInfo} from '../../modal/alert-info.modal';
import {AlertService} from '../../core/alert.service';
import {ValidationService} from '../../core/validation.service';

const serNumberError: AlertInfo = {
    header: '',
    message: 'Please provide valid serial number!',
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
    productModelList: Array<{ name: string }>;
    selectedBrand: string;
    selectedModel: string;
    pattern: Map<string, string>;
    pricePattern: string;
    qty: Array<number>;
    serialNumbers: Array<number>;
    serialNumberFormControl: Array<FormControl>;
    allModelList: Array<any>;


    constructor(public modalController: ModalController,
                protected dataService: DataService,
                protected alertService: AlertService,
                protected validationService: ValidationService) {
        this.allModelList = dataService.getProductModelList();
        this.productModelList = new Array<{ name: string }>();
        this.pattern = dataService.getPattern();
        this.brandList = Object.keys(this.allModelList);
        this.selectedProducts = [];
        this.pricePattern = this.pattern.get('amountPattern');
        this.selectedBrand = null;
        this.selectedModel = null;
        this.qty = new Array<number>(50);
        this.serialNumbers = new Array<number>();
        this.serialNumberFormControl = new Array<FormControl>();
    }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            'brand': new FormControl(null, [Validators.required]),
            'model': new FormControl(null, [Validators.required]),
            'qty': new FormControl(null, [Validators.required]),
            'price': new FormControl(null, [Validators.required, Validators.pattern(this.pricePattern)])
        });
    }

    async dismissModal() {
        await this.modalController.dismiss({
            'selectedProducts': this.selectedProducts
        });
        this.selectedProducts = [];
    }

    performValidation() {
        let validation: boolean = this.validationService.performValidation(this.productForm, 'PRODUCT_PROPERTY_MAP');
        if (this.serialNumberFormControl && validation) {
            _.forEach(this.serialNumberFormControl, (s: FormControl) => {
                if (validation) {
                    validation = s.valid;
                }
            });
            if (!validation) {
                this.alertService.presentAlert(serNumberError);
            }
        }

        return validation;
    }

    onSave() {
        this.dismissModal();
    }

    onAdd() {
        if (this.performValidation()) {
            const product = new Product();
            product.model = this.productForm.value.model;
            product.serialNumber = _.map(this.serialNumberFormControl, (control: FormControl) => {
                return control.value;
            });
            product.qty = this.productForm.value.qty;
            product.price = this.productForm.value.price;
            if (this.validateModel(product)) {
                this.selectedProducts.push(product);
            } else {
                this.alertService.presentAlert(duplicationAlert);
            }
        }
    }

    validateModel(product: Product): boolean {
        return !_.find(this.selectedProducts, (p: Product) => {
            return p.model === product.model;
        });
    }

    onQtyChange() {
        this.serialNumberFormControl = new Array<FormControl>();
        for (let i = 0; i < Number(this.productForm.get('qty').value); i++) {
            this.serialNumberFormControl[i] = (new FormControl(null, [Validators.required]));
        }
    }

    onRemove(product: Product) {
        _.remove(this.selectedProducts, product);
    }

    onReset() {
        while (this.productModelList.length) {
            this.productModelList.pop();
        }
        const tempList = [...this.allModelList[this.productForm.get('brand').value]];
        for (let i = 0; i < tempList.length; i++) {
            this.productModelList.push(tempList[i]);
        }
        this.productForm.get('model').reset();
        this.productForm.get('price').reset();
        this.productForm.get('qty').reset();
    }

    onCancel() {
        this.selectedBrand = null;
        this.selectedModel = null;
        this.selectedProducts = [];
        this.dismissModal();
    }
}
