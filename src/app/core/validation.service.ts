import {Const} from './const/Const';
import _ from 'lodash';
import {FormGroup} from '@angular/forms';
import {AlertInfo} from '../modal/alert-info.modal';
import {AlertService} from './alert.service';
import {Injectable} from '@angular/core';

const validationAlert: AlertInfo = {
    header: 'Incorrect data provided!',
    message: '',
    buttons: ['OK']
};

@Injectable()
export class ValidationService {


    constructor(private alertService: AlertService) {

    }

    public performValidation(formGroup: FormGroup, alertMessageMapping?: string) {
        let validation = true;
        _.forEach(_.keysIn(formGroup.value), (key: string) => {
            if (!formGroup.get(key).valid && validation) {
                if (alertMessageMapping) {
                    validationAlert.message = 'Please provide valid ' + Const[alertMessageMapping][key];
                } else {
                    validationAlert.message = 'Please provide valid ' + key;
                }
                this.alertService.presentAlert(validationAlert);
                validation = false;
            }
        });
        return validation;

    }
}
