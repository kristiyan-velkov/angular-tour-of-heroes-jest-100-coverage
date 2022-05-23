import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
	let service: MessageService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MessageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('messages [Property]', () => {
		it('should be empty Array by default', () => {
			expect(service.messages).toEqual([]);
		});
	});

	describe('add() [Method]', () => {
		const mockMessage = 'Test message';

		it('should push the message to message Array', () => {
			jest.spyOn(service, 'add');

			service.add(mockMessage);

			expect(service.messages.length).toEqual(1);
		});
	});

	describe('clear() [Method]', () => {
		it('should clear all messages from message Array', () => {
			jest.spyOn(service, 'clear');

			service.clear();

			expect(service.messages.length).toEqual(0);
		});
	});
});
