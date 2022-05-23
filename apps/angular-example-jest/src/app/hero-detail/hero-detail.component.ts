import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { Hero } from '../hero/models/hero.interface';
@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    public hero?: Hero;
    public heroId?: number;
    public routerHeroId = this.route.snapshot.paramMap.get('id');

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {}

    ngOnInit(): void {
        if (this.routerHeroId) {
            this.heroId = parseInt(this.routerHeroId, 10);
        }

        this.getHero();
    }

    getHero(): void {
        if (this.heroId) {
            this.heroService
                .getHero(this.heroId)
                .subscribe((hero) => (this.hero = hero));
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(hero: Hero): void {
        this.heroService.updateHero(hero).subscribe(() => this.goBack());
    }
}
