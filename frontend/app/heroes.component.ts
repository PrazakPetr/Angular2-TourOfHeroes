import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import {HeroService} from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: [HeroService]
})


export class HeroesComponent implements OnInit{
  
  constructor(private heroService: HeroService,
  private router: Router) {}
  
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];

  getHeroes(): void {
    console.error('getHeroes called'); 
    this.heroService.getHeroes().then(h => this.heroes = h);
  }

  ngOnInit() : void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string) : void {
    name = name.trim();
    if(!name) {return;}

    let hero = new Hero();
    hero.name = name;

    this.heroService.createHero(hero)
    .then(h=> {
      this.heroes.push(h);
      this.selectedHero = h;

    });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
    .then(() => {
      this.heroes = this.heroes.filter(h => h.id !== hero.id);
        if (this.selectedHero === hero) { this.selectedHero = null; }

    })
  }
}