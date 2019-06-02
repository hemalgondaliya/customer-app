import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../core/data.service';
import {ValidationService} from '../../core/validation.service';
import {Model} from '../../modal/model';
import {AlertService} from '../../core/alert.service';
import {AlertInfo} from '../../modal/alert-info.modal';
import _ from 'lodash';

const errorAlert: AlertInfo = {
    header: 'Erro while savind data!',
    message: '',
    buttons: ['OK']
};

const successAlert: AlertInfo = {
    header: 'Model is edited!',
    message: '',
    buttons: ['OK']
};

@Component({
    selector: 'edit-model',
    templateUrl: 'edit-model.component.html',
    styleUrls: ['edit-model.component.scss']
})
export class EditModelComponent implements OnInit {


    editModelForm: FormGroup;
    brandList: Array<string>;
    productModelList: Array<any>;

    editOptions = {CREATE: 'create', REMOVE: 'remove'};

    constructor(private alertService: AlertService,
                protected dataService: DataService,
                protected validationService: ValidationService) {
        this.productModelList = dataService.getProductModelList();
        this.brandList = Object.keys(this.productModelList);
    }

    ngOnInit(): void {
        this.editModelForm = new FormGroup({
            'brand': new FormControl(null, [Validators.required]),
            'editOption': new FormControl(null, [Validators.required]),
            'model': new FormControl(null, [Validators.required])
        });
    }

    performValidation() {
        return this.validationService.performValidation(this.editModelForm, 'EDIT_MODEL');
    }

    onSave() {
        if (this.performValidation()) {
            const model: Model = new Model();
            model.brandName = this.editModelForm.get('brand').value.split('-')[0];
            model.categoryName = this.editModelForm.get('brand').value.split('-')[1];
            model.modelName = this.editModelForm.get('model').value;
            if (this.editModelForm.get('editOption').value === this.editOptions.CREATE) {
                this.saveModel(model);
            }
            if (this.editModelForm.get('editOption').value === this.editOptions.REMOVE) {
                this.deprecateModel(model);
            }
        }
    }

    saveModel(model: Model) {
        this.dataService.addNewModel(model).subscribe((response) => {
            if (response.statusCode === 200) {
                this.alertService.presentAlert(successAlert);
                this.updateProductModelList(this.editOptions.CREATE, model);
            }
        }, (errorResponse: any) => {
            errorAlert.message = errorResponse.error.message;
            this.alertService.presentAlert(errorAlert);
        });
    }

    deprecateModel(model: Model) {
        this.dataService.deprecateModel(model).subscribe((response) => {
            if (response.statusCode === 200) {
                this.alertService.presentAlert(successAlert);
                this.updateProductModelList(this.editOptions.REMOVE, model);
            }
        }, (errorResponse: any) => {
            errorAlert.message = errorResponse.error.message;
            this.alertService.presentAlert(errorAlert);
        });
    }

    onEditOptionChange() {
        this.editModelForm.get('model').reset();
    }

    updateProductModelList(updateOption: string, model: Model) {
        if (updateOption === this.editOptions.REMOVE) {
            _.remove(this.productModelList[this.editModelForm.get('brand').value], (item: any) => {
                return item.name === model.modelName;
            });
        }
        if (updateOption === this.editOptions.CREATE) {
            this.productModelList[this.editModelForm.get('brand').value].push({name: model.modelName});
        }
        this.editModelForm.reset();
    }

}
