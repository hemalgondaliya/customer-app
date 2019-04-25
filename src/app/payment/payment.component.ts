import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../core/data.service';
import {ValidationService} from '../core/validation.service';
import {AlertService} from '../core/alert.service';
import {Payment} from '../modal/payment';


@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss']
})
export class PaymentComponent implements OnInit {


    paymentForm: FormGroup;
    paymentMethod: Array<string>;
    customer = null;
    enablePayment: boolean;
    bankNamePattern: string;
    chequeNumberPattern: string;
    amountPattern: string;

    constructor(private dataService: DataService, private validationService: ValidationService,
                private alertService: AlertService) {
        this.paymentMethod = this.dataService.getPaymentMethods();
        this.enablePayment = false;
        this.bankNamePattern = '[A-Za-z]{2,32}';
        this.chequeNumberPattern = '[0-9]{6}';
        this.amountPattern = '[1-9]\\d{2,6}$';
    }

    ngOnInit(): void {
        this.paymentForm = new FormGroup({
            'billNumber': new FormControl(null, [Validators.required]),
            'year': new FormControl(null, [Validators.required]),
            'paymentMethod': new FormControl(null, [Validators.required]),
            'chequeNumber': new FormControl(null, []),
            'bankName': new FormControl(null, []),
            'amount': new FormControl(null, [Validators.required, Validators.pattern(this.amountPattern)]),
            'receiver': new FormControl(null, [Validators.required])
        });
    }

    findCustomer() {
        this.dataService.searchCustomer({
            billNumber: this.paymentForm.get('billNumber').value,
            year: this.paymentForm.get('year').value
        }).subscribe(response => {
            this.customer = response;
            this.enablePayment = true;
        }, error => {
            this.alertService.presentAlert({header: error.error.error, message: error.error.message, buttons: ['OK']});
        });
    }


    onSubmit() {
        if (this.validationService.performValidation(this.paymentForm)) {
            const p: Payment = {...this.paymentForm.value};
            p.customerName = this.customer.firstName;
            this.dataService.addPayment(p).subscribe(response => {
                this.enablePayment = false;
                this.paymentForm.reset();
                this.customer = null;
                this.alertService.presentAlert({header: '', message: response.message, buttons: ['OK']});
            }, error => {
                this.alertService.presentAlert({header: error.error.error, message: error.error.message, buttons: ['OK']});
            });
        }

    }

    onPaymentMethodChange() {
        if (this.paymentForm.get('paymentMethod').value === 'CHEQUE') {
            this.paymentForm.get('chequeNumber').setValidators([Validators.required, Validators.pattern(this.chequeNumberPattern)]);
            this.paymentForm.get('bankName').setValidators([Validators.required, Validators.pattern(this.bankNamePattern)]);
        } else {
            this.paymentForm.get('chequeNumber').clearValidators();
            this.paymentForm.get('bankName').clearValidators();
        }
        this.paymentForm.get('chequeNumber').updateValueAndValidity();
        this.paymentForm.get('bankName').updateValueAndValidity();
    }

}
