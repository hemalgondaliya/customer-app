import {Component, OnInit} from '@angular/core';
import {EventService} from '../core/event.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginComponent implements OnInit {
    isLoggedIn = false;
    constructor(private eventService: EventService, private router: Router) {
    }

    ngOnInit() {
    }

    logIn() {
        this.isLoggedIn = true;
        this.eventService.emit('loginSuccess', true);
        this.router.navigateByUrl('home');
    }
}
