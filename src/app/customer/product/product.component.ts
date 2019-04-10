import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DataService} from '../../core/data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit {

    @Input() selectedProduct: {};

    productForm: FormGroup;

    productModelList: Array<String>;

    constructor(public modalController: ModalController, protected dataService: DataService) {
        this.productModelList = dataService.getProductModelList();
        this.selectedProduct = {};
    }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            'productModel': new FormControl(null, [Validators.required])
        });
    }

    async dismissModal() {
        await this.modalController.dismiss({
            'selectedProduct': this.selectedProduct
        });
        this.selectedProduct = {};
    }

    onSave() {
        this.dismissModal();
    }

    onCancel() {
        this.selectedProduct = {};
        this.dismissModal();
    }
}
