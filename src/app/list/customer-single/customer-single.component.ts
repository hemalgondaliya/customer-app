import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Customer} from '../../modal/customer';


@Component({
    selector: 'customer-single',
    templateUrl: 'customer-single.component.html',
    styleUrls: ['customer-single.component.scss']
})
export class CustomerSingleComponent {

    @Input() customer: Customer;
    // @Input() value: number;

    constructor(public modalController: ModalController) {
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }
}
