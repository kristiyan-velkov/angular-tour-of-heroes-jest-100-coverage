import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
	let component: HeroComponent;
	let fixture: ComponentFixture<HeroComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeroComponent],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeroComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hero [Input]', () => {
		it('should be falsy', () => {
			expect(component.hero).toBeFalsy();
		});
	});

	describe('delete [Output]', () => {
		it('should be type EventEmitter', () => {
			expect(component.delete).toEqual(new EventEmitter());
		});
	});

	describe('onDeleteClick', () => {
		const mockEvent = new Event('click');

		it('should be called', () => {
			jest.spyOn(component, 'onDeleteClick');

			component.onDeleteClick(mockEvent);

			expect(component.onDeleteClick).toHaveBeenCalledWith(mockEvent);
		});

		it('should be called delete.next [Output] method ', () => {
			jest.spyOn(component, 'onDeleteClick');
			jest.spyOn(component.delete, 'next');

			component.onDeleteClick(mockEvent);

			expect(component.delete.next).toHaveBeenCalled();
		});
	});
});
