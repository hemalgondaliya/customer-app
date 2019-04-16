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

    async presentAlertConfirm(message: string, okFunc: Function) {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => okFunc()
                }
            ]
        });

        await alert.present();
    }
}
