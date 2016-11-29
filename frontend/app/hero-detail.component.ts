import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service'

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    template: `
    <div *ngIf="hero">
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name"/>
        </div>
        <button (click)="goBack()">Back</button>
        <button (click)="save()">Save</button>
    </div>
    `,
    styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    @Input()
    hero: Hero;

    ngOnInit(): void {
        this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(h => this.hero = h);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService
        .updateHero(this.hero)
        .then(() => this.goBack());
    }
}