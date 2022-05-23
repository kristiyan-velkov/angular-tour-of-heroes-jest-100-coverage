import { Component, OnInit } from '@angular/core';
import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { Hero } from '../hero/models/hero.interface';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
    public heroes: Hero[] = [];

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService
            .getHeroes()
            .subscribe((heroes) => (this.heroes = heroes));
    }

    addHero(heroName: string): void {
        if (heroName) {
            heroName = heroName.trim();
            this.heroService.addHero(heroName).subscribe((hero) => {
                this.heroes.push(hero);
            });
        }
    }

    deleteHero(heroId: number): void {
        this.heroes = this.heroes.filter((hero) => hero.id !== heroId);
        this.heroService.deleteHero(heroId).subscribe();
    }
}
