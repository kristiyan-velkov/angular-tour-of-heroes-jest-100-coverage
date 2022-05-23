import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { StrengthPipe } from '@angular-example-jest/shared/pipes/strength.pipe';
import { of } from 'rxjs';
import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { Hero } from '../hero/models/hero.interface';

describe('HeroDetailComponent', () => {
	let component: HeroDetailComponent;
	let fixture: ComponentFixture<HeroDetailComponent>;
	let service: HeroService;
	let location: Location;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeroDetailComponent, StrengthPipe],
			imports: [RouterTestingModule, HttpClientTestingModule, RouterTestingModule],
			providers: [HeroService, Location],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeroDetailComponent);
		service = TestBed.inject(HeroService);
		location = TestBed.inject(Location);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hero [Property]', () => {
		it('should be falsy', () => {
			expect(component.hero).toBeFalsy();
		});
	});

	describe('routerHeroId [Property]', () => {
		it('should be falsy', () => {
			expect(component.routerHeroId).toBeFalsy();
		});
	});

	describe('heroId [Property]', () => {
		it('should be falsy', () => {
			expect(component.heroId).toBeFalsy();
		});

		it('should get value from routerHeroId [Property]', () => {
			component.routerHeroId = '1';

			component.ngOnInit();

			expect(component.heroId).toEqual(1);
		});
	});

	describe('getHero() [Method]', () => {
		const mockHeroes: Hero[] = [
			{
				id: 1,
				name: 'Dr Nice',
				strength: 15,
			},
			{
				id: 2,
				name: 'Narco',
				strength: 10,
			},
		];

		it('should be called on initialization', () => {
			jest.spyOn(component, 'getHero');

			component.ngOnInit();

			expect(component.getHero).toHaveBeenCalledTimes(1);
		});

		it('should be called heroService getHero() [Method]', () => {
			const mockHeroId = 1;

			jest.spyOn(component, 'getHero');
			jest.spyOn(service, 'getHero');

			component.heroId = mockHeroId;
			component.getHero();

			expect(service.getHero).toHaveBeenCalledWith(mockHeroId);
		});

		it(
			'should return hero from heroService getHero() [Method]',
			waitForAsync(() => {
				component.heroId = mockHeroes[0].id;

				jest.spyOn(component, 'getHero');
				jest.spyOn(service, 'getHero').mockReturnValueOnce(of(mockHeroes[0]));

				component.getHero();

				service.getHero(component.heroId).subscribe((hero: any) => {
					expect(component.hero).toEqual(hero);
				});
			})
		);
	});

	describe('goBack() [Method]', () => {
		it('should call location.back() [Method]', () => {
			jest.spyOn(location, 'back').mockImplementation(() => true);

			component.goBack();

			expect(location.back).toHaveBeenCalled();
		});
	});

	describe('save() [Method]', () => {
		const mockHero: Hero = {
			id: 1,
			name: 'Narco',
			strength: 6,
		};

		it('should call heroService.updateHero() [Method]', () => {
			jest.spyOn(component, 'save');
			jest.spyOn(component, 'goBack');
			jest.spyOn(service, 'updateHero').mockReturnValueOnce(of(mockHero));

			component.save(mockHero);

			expect(service.updateHero).toHaveBeenCalledWith(mockHero);
			expect(component.goBack).toHaveBeenCalled();
		});
	});
});
