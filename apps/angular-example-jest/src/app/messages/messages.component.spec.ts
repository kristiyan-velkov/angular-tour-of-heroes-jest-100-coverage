import { MessageService } from '@angular-example-jest/core/services/message.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
	let component: MessagesComponent;
	let fixture: ComponentFixture<MessagesComponent>;
	let service: MessageService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MessagesComponent],
			providers: [MessageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagesComponent);
		service = TestBed.inject(MessageService);

		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('clearAllMessages() [Method]', () => {
		beforeEach(() => {
			jest.spyOn(component, 'clearAllMessages');
		});

		it('should call messageService.clear() [Method]', () => {
			jest.spyOn(service, 'clear');

			component.clearAllMessages();

			expect(service.clear).toHaveBeenCalledTimes(1);
		});
	});
});
