import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../hero/models/hero.interface';

describe('HeroesComponent', () => {
	let component: HeroesComponent;
	let fixture: ComponentFixture<HeroesComponent>;
	let service: HeroService;

	const mockHeroes: Hero[] = [
		{
			id: 1,
			name: 'Kristiyan Velkov',
			strength: 30,
		},
		{
			id: 2,
			name: 'Dr Nice',
			strength: 15,
		},
		{
			id: 3,
			name: 'Narco',
			strength: 10,
		},
	];

	const mockHero: Hero = {
		id: 1,
		name: 'Kris Velkov',
		strength: 30,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeroesComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [HeroService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeroesComponent);
		service = TestBed.inject(HeroService);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});

	describe('heroes [Property]', () => {
		it('should be empty Array', () => {
			expect(component.heroes).toEqual([]);
		});
	});

	describe('getHeroes() [Method]', () => {
		it('should be called after the component has initialized', () => {
			jest.spyOn(component, 'getHeroes');

			component.ngOnInit();

			expect(component.getHeroes).toHaveBeenCalledTimes(1);
		});

		it('should be called heroService getHeroes() [Method]', () => {
			jest.spyOn(component, 'getHeroes');
			jest.spyOn(service, 'getHeroes');

			component.getHeroes();

			expect(service.getHeroes).toHaveBeenCalledTimes(1);
		});

		it('should return heroes from getHeroes() [Method]', () => {
			jest.spyOn(component, 'getHeroes');
			jest.spyOn(service, 'getHeroes').mockReturnValue(of(mockHeroes));

			component.getHeroes();

			expect(component.heroes).toEqual(mockHeroes);
		});
	});

	describe('addHero() [Method]', () => {
		it('should be called with hero name', () => {
			jest.spyOn(component, 'addHero');

			component.addHero(mockHero.name);

			expect(component.addHero).toHaveBeenCalledWith(mockHero.name);
		});

		it('should be called heroService.addHero() if have hero name', () => {
			jest.spyOn(component, 'addHero');
			jest.spyOn(service, 'addHero');

			component.addHero(mockHero.name);

			expect(service.addHero).toHaveBeenCalledWith(mockHero.name);
		});

		it(
			'should called heroService.addHero() and return new heroes Array',
			waitForAsync(() => {
				const mockNewHero: Hero = {
					name: 'test',
					id: 4,
					strength: 5,
				};

				component.heroes = mockHeroes;

				jest.spyOn(component, 'addHero');
				jest.spyOn(service, 'addHero').mockReturnValueOnce(of(mockNewHero));

				component.addHero(mockHero.name);

				service.addHero(mockHero.name).subscribe((hero) => {
					component.heroes?.push(hero);
					expect(component.heroes).toContain(expect.objectContaining(mockNewHero));
				});
			})
		);

		it('should not be called heroService.addHero() if not have hero name', () => {
			jest.spyOn(component, 'addHero');
			jest.spyOn(service, 'addHero');

			component.addHero('');

			expect(service.addHero).not.toHaveBeenCalled();
		});
	});

	describe('deleteHero() [Method]', () => {
		it('should be called with hero Id', () => {
			jest.spyOn(component, 'deleteHero');

			component.deleteHero(mockHero.id);

			expect(component.deleteHero).toHaveBeenCalledWith(mockHero.id);
		});

		it('should be deleted hero with id from heroes Array', () => {
			component.heroes = mockHeroes;
			jest.spyOn(component, 'deleteHero');

			component.deleteHero(mockHero.id);

			expect(component.heroes).not.toContain(expect.objectContaining(mockHero));
		});

		it('should be called heroService.deleteHero() if is have hero Id', () => {
			jest.spyOn(component, 'deleteHero');
			jest.spyOn(service, 'deleteHero');

			component.deleteHero(mockHero.id);

			expect(service.deleteHero).toHaveBeenCalledWith(mockHero.id);
		});
	});
});
