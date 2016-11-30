import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { AuthService } from './auth.service';


@Injectable()
export class HeroService{

    private heroesUrl = 'http://localhost:25207/api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private authService: AuthService) {}

    private getStaticHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    private getDynamicHeroes() : Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as Hero[])
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
       const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url).toPromise()
            .then(response => response.json() as Hero)
            .catch(this.handleError);
    }

    updateHero(hero: Hero): Promise<Hero> {
       const url = `${this.heroesUrl}/${hero.id}`;

       return this.http
            .put(url, 
                JSON.stringify(hero),
                 {headers: this.authService.appendAuthHeaders(this.headers)}
                 )
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    createHero(hero: Hero): Promise<Hero>{
        return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(res => res.json() as Hero)
        .catch(this.handleError);
    }

    deleteHero(id: number) : Promise<void>{
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}