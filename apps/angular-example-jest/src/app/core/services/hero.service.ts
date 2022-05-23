import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Hero } from '../../hero/models/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroService {
	public apiUrl = 'api/heroes';

	constructor(private http: HttpClient, private messageService: MessageService) {}

	/** GET heroes from the server */
	public getHeroes(): Observable<any> {
		return this.http.get<Hero[]>(this.apiUrl).pipe(
			tap(() => this.log('fetched heroes')),
			catchError((err) => this.handleError(err, 'getHeroes'))
		);
	}

	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<any> {
		return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
			tap(() => this.log(`fetched hero id=${id}`)),
			catchError((err) => this.handleError(err, `getHero id=${id}`))
		);
	}

	/* GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<any> {
		return this.http.get<Hero[]>(`${this.apiUrl}/?name=${term}`).pipe(
			tap((x) => (x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`))),
			catchError((err) => this.handleError(err, 'searchHeroes'))
		);
	}

	//////// Save methods //////////

	/** POST: add a new hero to the server */
	addHero(name: string): Observable<any> {
		return this.http
			.post<Hero>(this.apiUrl, { name })
			.pipe(
				tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
				catchError((err) => this.handleError(err, 'addHero'))
			);
	}

	/** DELETE: delete the hero from the server */
	deleteHero(id: number): Observable<any> {
		const url = `${this.apiUrl}/${id}`;

		return this.http.delete<Hero>(url).pipe(
			tap(() => this.log(`deleted hero id=${id}`)),
			catchError((err) => this.handleError(err, 'deleteHero'))
		);
	}

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.apiUrl, hero).pipe(
			tap(() => this.log(`updated hero id=${hero.id}`)),
			catchError((err) => this.handleError(err, 'updateHero'))
		);
	}

	/** Log a HeroService message with the MessageService */
	public log(message: string): void {
		this.messageService.add(`HeroService: ${message}`);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	public handleError(error: Error, operation: string): Observable<any> {
		this.log(`${operation} failed: ${error.message}`);
		return of(error);
	}
}
