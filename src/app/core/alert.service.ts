import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertInfo} from '../modal/alert-info.modal';


@Injectable()
export class AlertService {

    constructor(private alertController: AlertController) {
    }

    async presentAlert(alertInfo: AlertInfo) {
        const alert = await this.alertController.create({
            header: alertInfo.header,
            subHeader: alertInfo.subHeader,
            message: alertInfo.message,
            buttons: alertInfo.buttons
        });

        await alert.present();
    }
}
