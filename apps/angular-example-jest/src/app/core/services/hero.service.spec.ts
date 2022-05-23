import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../../hero/models/hero.interface';

describe('HeroService', () => {
	const mockApiUrl = 'api/heroes';
	const mockHeroes: Hero[] = [
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
	];

	let service: HeroService;
	let messageService: MessageService;
	let httpTestingController: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [MessageService],
		});

		service = TestBed.inject(HeroService);
		messageService = TestBed.inject(MessageService);

		httpTestingController = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	describe('apiUrl [Property]', () => {
		it('should content correct API URL', () => {
			expect(service.apiUrl).toEqual(mockApiUrl);
		});
	});

	describe('getHeroes() [Method]', () => {
		it('should exist', () => {
			jest.spyOn(service, 'getHeroes');

			expect(service.getHeroes).toBeTruthy();
		});

		it(
			'should be called with GET method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get');

				httpClient.get(mockApiUrl).subscribe();

				const req: TestRequest = httpTestingController.expectOne(mockApiUrl);

				expect(req.request.method).toEqual('GET');

				req.flush(null);
			})
		);

		it(
			'should return all heroes',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get').mockReturnValue(of(mockHeroes));

				httpClient.get(mockApiUrl).subscribe((heroes) => {
					expect(heroes).toEqual(mockHeroes);
				});
			})
		);

		it(
			'should call log() [Method] with correct message',
			waitForAsync(() => {
				const mockMessage = 'fetched heroes';
				jest.spyOn(service, 'log').mockImplementation(() => true);
				jest.spyOn(service, 'getHeroes');

				service.getHeroes().subscribe(() => expect(service.log).toHaveBeenCalledWith(mockMessage));

				const req: TestRequest = httpTestingController.expectOne(mockApiUrl);

				req.flush(mockHeroes);
			})
		);

		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'getHeroes');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.getHeroes().subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(mockApiUrl);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('getHero() [Method]', () => {
		const mockHeroId = mockHeroes[0].id;
		const endpoint = `${mockApiUrl}/${mockHeroId}`;

		it('should exist', () => {
			jest.spyOn(service, 'getHero');
			expect(service.getHero).toBeTruthy();
		});

		it(
			'should be called with GET method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get');

				httpClient.get(endpoint).subscribe();

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				expect(req.request.method).toEqual('GET');

				req.flush(null);
			})
		);

		it(
			'should return hero',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get').mockReturnValue(of(mockHeroes));

				httpClient.get(endpoint).subscribe((hero) => {
					expect(hero).toEqual(mockHeroes);
				});
			})
		);

		it(
			'should call log() [Method] with correct message',
			waitForAsync(() => {
				const mockMessage = `fetched hero id=${mockHeroId}`;

				jest.spyOn(service, 'getHero');
				jest.spyOn(service, 'log').mockImplementation(() => true);

				service.getHero(mockHeroId).subscribe(() => expect(service.log).toHaveBeenCalledWith(mockMessage));

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'getHero');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.getHero(mockHeroId).subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('searchHeroes() [Method]', () => {
		const mockHeroName = mockHeroes[0].name;
		const endpoint = `${mockApiUrl}/?name=${mockHeroName}`;

		it('should exist', () => {
			jest.spyOn(service, 'searchHeroes');

			expect(service.searchHeroes).toBeTruthy();
		});

		it(
			'should be called with GET method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get');

				httpClient.get(endpoint).subscribe();

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				expect(req.request.method).toEqual('GET');

				req.flush(null);
			})
		);

		it(
			'should return founded hero',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'get').mockReturnValue(of(mockHeroes));

				httpClient.get(endpoint).subscribe((hero) => {
					expect(hero).toEqual(mockHeroes);
				});
			})
		);

		it(
			'should call log() [Method] with "found heroes" message',
			waitForAsync(() => {
				const mockMessage = `found heroes matching "${mockHeroName}"`;

				jest.spyOn(service, 'searchHeroes');
				jest.spyOn(service, 'log').mockImplementation(() => true);

				service.searchHeroes(mockHeroName).subscribe(() => {
					expect(service.log).toHaveBeenCalledWith(mockMessage);
				});

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should call log() [Method] with "no heroes matching" message',
			waitForAsync(() => {
				const mockMessage = `no heroes matching "${mockHeroName}"`;

				jest.spyOn(service, 'log');
				jest.spyOn(service, 'searchHeroes');

				service.searchHeroes(mockHeroName).subscribe(() => {
					expect(service.log).toHaveBeenCalledWith(mockMessage);
				});

				const req: TestRequest = httpTestingController.expectOne(`${mockApiUrl}/?name=${mockHeroName}`);

				req.flush([]);
			})
		);
		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'searchHeroes');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.searchHeroes(mockHeroName).subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('addHero() [Method]', () => {
		const mockNewHero: Hero = {
			id: 4,
			name: 'Test',
			strength: 5,
		};
		const endpoint = mockApiUrl;

		it('should exist', () => {
			jest.spyOn(service, 'addHero');
			expect(service.addHero).toBeTruthy();
		});

		it(
			'should be called with POST method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'post');

				httpClient.post(endpoint, mockNewHero).subscribe();

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				expect(req.request.method).toEqual('POST');

				req.flush(null);
			})
		);

		it(
			'should add hero',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'post').mockReturnValue(of(mockHeroes));

				httpClient.get(endpoint).subscribe((heroes) => {
					mockHeroes.push(mockNewHero);

					expect(heroes).toContain(mockNewHero);
				});

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should call log() [Method] with correct message',
			waitForAsync(() => {
				const mockMessage = `added hero w/ id=undefined`;

				jest.spyOn(service, 'addHero');

				jest.spyOn(service, 'log').mockImplementation(() => true);

				service.addHero(mockNewHero.name).subscribe(() => expect(service.log).toHaveBeenCalledWith(mockMessage));

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'addHero');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.addHero(mockNewHero.name).subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('deleteHero() [Method]', () => {
		const mockHeroId = mockHeroes[0].id;
		const endpoint = `${mockApiUrl}/${mockHeroId}`;

		it('should exist', () => {
			jest.spyOn(service, 'deleteHero');
			expect(service.deleteHero).toBeTruthy();
		});

		it(
			'should be called with DELETE method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'delete');

				httpClient.delete(endpoint).subscribe();

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				expect(req.request.method).toEqual('DELETE');

				req.flush(null);
			})
		);

		it(
			'should delete hero',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'delete').mockReturnValue(of(mockHeroes[0]));

				httpClient
					.delete(endpoint)
					.pipe(map((hero) => hero !== mockHeroes[0]))
					.subscribe((heroes) => {
						expect(heroes).not.toContain(mockHeroes[0]);
					});
			})
		);

		it(
			'should call log() [Method]',
			waitForAsync(() => {
				const mockMessage = `deleted hero id=${mockHeroId}`;

				jest.spyOn(service, 'deleteHero');
				jest.spyOn(service, 'log').mockImplementation(() => true);

				service.deleteHero(mockHeroId).subscribe(() => expect(service.log).toHaveBeenCalledWith(mockMessage));

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'deleteHero');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.deleteHero(mockHeroId).subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('updateHero() [Method]', () => {
		const mockHero = mockHeroes[0];
		const endpoint = mockApiUrl;

		it('should exist', () => {
			jest.spyOn(service, 'updateHero');

			expect(service.updateHero).toBeTruthy();
		});

		it(
			'should be called with PUT method',
			waitForAsync(() => {
				jest.spyOn(httpClient, 'put');

				httpClient.put(endpoint, mockHero).subscribe();

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				expect(req.request.method).toEqual('PUT');

				req.flush(null);
			})
		);

		it(
			'should update hero',
			waitForAsync(() => {
				mockHero.name = 'Ivan';

				jest.spyOn(httpClient, 'put').mockReturnValue(of(mockHeroes));

				httpClient
					.put(endpoint, mockHero)
					.pipe(
						map((hero: any) => {
							if (hero.id === mockHero.id) {
								hero.id = mockHero.id;
								return hero;
							}
							return hero;
						})
					)
					.subscribe((heroes) => {
						expect(heroes).toContain(mockHero);
					});
			})
		);

		it(
			'should call log() [Method] with correct message',
			waitForAsync(() => {
				const mockMessage = `updated hero id=${mockHero.id}`;

				jest.spyOn(service, 'updateHero');
				jest.spyOn(service, 'log').mockImplementation(() => true);

				service.updateHero(mockHero).subscribe(() => expect(service.log).toHaveBeenCalledWith(mockMessage));

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.flush(mockHeroes);
			})
		);

		it(
			'should be called handleError() [Method] if have error',
			waitForAsync(() => {
				const mockErrorEvent = new ErrorEvent('Unknown Error Event');
				const mockError = new Error('Unknown Error');

				jest.spyOn(service, 'updateHero');
				jest.spyOn(service, 'handleError').mockImplementation(() => of(mockError));

				service.updateHero(mockHero).subscribe(() => expect(service.handleError).toHaveBeenCalled());

				const req: TestRequest = httpTestingController.expectOne(endpoint);

				req.error(mockErrorEvent);
			})
		);
	});

	describe('log() [Method]', () => {
		const mockMessage = 'New message';

		it('should exist', () => {
			jest.spyOn(service, 'log');

			expect(service.log).toBeTruthy();
		});

		it('should be called with message', () => {
			jest.spyOn(service, 'log');

			service.log(mockMessage);

			expect(service.log).toHaveBeenCalledWith(mockMessage);
		});

		it('should be called messageService.add() [Method]', () => {
			jest.spyOn(service, 'log');
			jest.spyOn(messageService, 'add');

			service.log(mockMessage);

			expect(messageService.add).toHaveBeenCalledWith(`HeroService: ${mockMessage}`);
		});
	});

	describe('handleError [Method]', () => {
		const mockOperation = 'updateHero';
		const mockError: Error = {
			message: 'Dummy Error',
			name: '404 Error',
		};

		it('should be called with correct arguments', () => {
			jest.spyOn(service, 'handleError').mockReturnValueOnce(of(mockError));

			service.handleError(mockError, mockOperation);

			expect(service.handleError).toHaveBeenCalledWith(mockError, mockOperation);
		});

		it('should be called log() [Method] with correct message', () => {
			const mockMessage = `${mockOperation} failed: ${mockError.message}`;

			jest.spyOn(service, 'handleError');
			jest.spyOn(service, 'log');

			service.handleError(mockError, mockOperation);

			expect(service.log).toHaveBeenCalledWith(mockMessage);
		});
	});
});
