import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from './models/hero.interface';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
    @Input() hero?: Hero;
    @Output() delete = new EventEmitter();

    onDeleteClick($event: { stopPropagation: () => void }): void {
        $event.stopPropagation();
        this.delete.next();
    }
}
