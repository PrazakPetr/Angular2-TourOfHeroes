import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    template: `
    <div>
        <div>
        <h2>{{username}}</h2>
        </div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="name" placeholder="username"/>
        </div>
        <div>
            <label>password: </label>
            <input [(ngModel)]="password" placeholder="password"/>
        </div>
        <button (click)="login()">Login</button>
    </div>
    `,
    styleUrls: ['hero-detail.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService) {}

    username: string;
    name: string;
    password: string;

    login(): void {
        this.authService.login(this.name, this.password)
        .then(n => this.username = n);
    }
}