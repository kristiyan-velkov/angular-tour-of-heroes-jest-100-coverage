import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from './hero-search.component';
import { of } from 'rxjs';
import { HeroService } from '@angular-example-jest/core/services/hero.service';
import { Hero } from '../hero/models/hero.interface';

describe('HeroSearchComponent', () => {
	let component: HeroSearchComponent;
	let fixture: ComponentFixture<HeroSearchComponent>;
	let service: HeroService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeroSearchComponent],
			imports: [HttpClientTestingModule, RouterTestingModule],
			providers: [HeroService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeroSearchComponent);
		service = TestBed.inject(HeroService);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('heroes$ [Observable]', () => {
		const mockSearchTerm = 'Narco';
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

		it(
			'should include the founded hero',
			waitForAsync(() => {
				component['searchTerms'].next(mockSearchTerm);

				jest.spyOn(component['searchTerms'], 'next');
				jest.spyOn(service, 'searchHeroes').mockReturnValueOnce(of(mockHeroes));

				component.ngOnInit();

				component.heroes$.subscribe(() => {
					expect(service.searchHeroes).toHaveBeenCalled();
				});
			})
		);
	});

	describe('searchHero() [Method]', () => {
		const mockSearchHero = 'Narco';

		beforeEach(() => {
			jest.spyOn(component, 'searchHero');
		});

		it('should be called with input value', () => {
			component.searchHero(mockSearchHero);

			expect(component.searchHero).toHaveBeenCalledWith(mockSearchHero);
		});

		it('should be called next method of Subject searchTerm', () => {
			jest.spyOn(component['searchTerms'], 'next');
			component.searchHero(mockSearchHero);
			component.ngOnInit();

			expect(component['searchTerms'].next).toHaveBeenCalledWith(mockSearchHero);
		});
	});
});
