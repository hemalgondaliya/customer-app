import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {EventService} from './core/event.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    isLoggedIn = false;
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        },
        {
            title: 'Customer',
            url: '/customer',
            icon: 'person-add'
        },
        {
            title: 'Payment',
            url: '/payment',
            icon: 'card'
        },
        {
            title: 'Edit model',
            url: '/editmodel',
            icon: 'create'
        },
        {
            title: 'Delivery Person',
            url: '/deliveryperson',
            icon: 'person-add'
        },
        {
            title: 'Logout',
            url: '',
            icon: 'log-out'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private eventService: EventService,
        private router: Router
    ) {
        this.initializeApp();
        this.eventService.on('loginSuccess').subscribe((data: any) => {
            this.isLoggedIn = true;
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.platform.pause.subscribe(() => {
                this.router.navigateByUrl('');
                // TODO: Close all instances of modal
                console.log('****UserdashboardPage PAUSED****');
            });
        });
    }
}
