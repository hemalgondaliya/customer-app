import {Component, ElementRef, OnInit} from '@angular/core';
import {EventService} from '../core/event.service';
import {Router} from '@angular/router';
import {DataService} from '../core/data.service';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../core/alert.service';
import {AlertInfo} from '../modal/alert-info.modal';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../core/auth.service';


@Component({
    selector: 'login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isLoggedIn = false;

    constructor(private eventService: EventService, private router: Router,
                private http: HttpClient, private dataService: DataService,
                private alertService: AlertService, private authService: AuthService) {
        localStorage.clear();
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'name': new FormControl(null),
            'password': new FormControl(null)
        });
    }

    onLogin() {
        const alertMessage: AlertInfo = {
            header: 'Login fail!',
            message: 'Please enter a valid credentials',
            buttons: ['OK']
        };

        ///// Exclude login authentication for testing purpose //////

        // this.isLoggedIn = true;
        // this.eventService.emit('loginSuccess', true);
        // this.router.navigateByUrl('home');

        ////////////////////////////////////////////////////////////

        if (this.loginForm.value.name !== null && this.loginForm.value.password !== null) {
            this.dataService.getLogin(this.loginForm.value)
                .subscribe((response: any) => {
                    console.log(response);
                    if (response.statusCode === 200) {
                        console.log('correct status...');
                        this.handleLoginSuccess(response);
                    } else {
                        this.alertService.presentAlert(alertMessage);
                    }
                }, (error) => {
                    this.alertService.presentAlert({header: error.error.error, message: error.error.message, buttons: ['OK']});
                });
        } else {
            this.alertService.presentAlert(alertMessage);
            console.log('Please Enter credentials');
        }
    }

    handleLoginSuccess(response: any) {
        this.isLoggedIn = true;
        this.eventService.emit('loginSuccess', true);
        this.router.navigateByUrl('home');
    }
}
