import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../../hero/models/hero.interface';

@Injectable({
	providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
	createDb(): { heroes: Hero[] } {
		const heroes: Hero[] = [
			{
				id: 1,
				name: 'Kris Velkov',
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
			{
				id: 4,
				name: 'Bombasto',
				strength: 5,
			},
			{
				id: 5,
				name: 'Celeritas',
				strength: 11,
			},
			{
				id: 6,
				name: 'Magneta',
				strength: 6,
			},
			{
				id: 7,
				name: 'RubberMan',
				strength: 1,
			},
			{
				id: 8,
				name: 'Dynama',
				strength: 24,
			},
			{
				id: 9,
				name: 'Dr IQ',
				strength: 20,
			},
			{
				id: 10,
				name: 'Magma',
				strength: 4,
			},
			{
				id: 11,
				name: 'Tornado',
				strength: 5,
			},
		];
		return { heroes };
	}

	// Overrides the genId method to ensure that a hero always has an id.
	// If the heroes array is empty,
	// the method below returns the initial number (11).
	// if the heroes array is not empty, the method below returns the highest
	// hero id + 1.
	genId(heroes: Hero[]): number {
		return heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 11;
	}
}
