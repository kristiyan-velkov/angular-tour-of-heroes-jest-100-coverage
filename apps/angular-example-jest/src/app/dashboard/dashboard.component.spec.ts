import { HeroSearchComponent } from './../hero-search/hero-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { Hero } from '../hero/models/hero.interface';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let service: HeroService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DashboardComponent, HeroSearchComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [HeroService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		service = TestBed.inject(HeroService);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('heroes [Property]', () => {
		it('should be empty array', () => {
			expect(component.heroes).toEqual([]);
		});
	});

	describe('getHeroes() [Method]', () => {
		const mockHeroes: Hero[] = [
			{
				id: 1,
				name: 'Narco',
				strength: 6,
			},
		];

		it('should call heroService.getHeroes() [Method]', () => {
			jest.spyOn(component, 'getHeroes');
			jest.spyOn(service, 'getHeroes').mockReturnValueOnce(of(mockHeroes));

			component.getHeroes();

			expect(service.getHeroes).toHaveBeenCalledTimes(1);
		});

		it(
			'should return heroes Array',
			waitForAsync(() => {
				jest.spyOn(component, 'getHeroes');
				jest.spyOn(service, 'getHeroes').mockReturnValueOnce(of(mockHeroes));

				component.getHeroes();

				service.getHeroes().subscribe((heroes) => {
					expect(heroes).toEqual(mockHeroes);
				});
			})
		);

		it('should update heroes [Property]', () => {
			jest.spyOn(component, 'getHeroes');
			jest.spyOn(service, 'getHeroes').mockReturnValueOnce(of(mockHeroes));

			component.getHeroes();

			expect(component.heroes).toEqual(mockHeroes);
		});
	});
});
