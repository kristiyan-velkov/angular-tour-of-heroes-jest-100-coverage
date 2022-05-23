import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrengthPipe } from './pipes/strength.pipe';

@NgModule({
	declarations: [StrengthPipe],
	imports: [CommonModule],
	exports: [StrengthPipe],
})
export class SharedModule {}
