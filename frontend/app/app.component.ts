import {Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
    <h1>MY - {{title}}</h1>
    <h3>{{title}}</h3>
    <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
   <router-outlet>
    `,
    styleUrls: ['app.component.css']

})

export class AppComponent {
    title: 'Tour'; 
}