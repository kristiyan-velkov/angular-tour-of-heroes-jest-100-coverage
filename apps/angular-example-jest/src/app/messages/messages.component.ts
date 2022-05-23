import { MessageService } from '@angular-example-jest/core/services/message.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
    constructor(public messageService: MessageService) {}

    public clearAllMessages(): void {
        this.messageService.clear();
    }
}
