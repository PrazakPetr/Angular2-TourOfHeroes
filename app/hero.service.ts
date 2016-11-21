import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heros';


@Injectable()
export class HeroService{

    private heroesUrl = 'app/heroes';

    constructor(private http: Http) {}

    private getStaticHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    private getDynamicHeroes() : Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHeroes() : Promise<Hero[]> {
        return this.getDynamicHeroes();
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
                    .then(hs => hs.find(h => h.id === id));
    }
}