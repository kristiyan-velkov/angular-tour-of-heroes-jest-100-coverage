import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from '@angular-example-jest/core/services/in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { HeroComponent } from './hero/hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { SharedModule } from '@angular-example-jest/shared/shared.module';

@NgModule({
	declarations: [AppComponent, DashboardComponent, HeroesComponent, HeroDetailComponent, MessagesComponent, HeroSearchComponent, HeroComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		SharedModule,
		RouterModule,
		AppRoutingModule,
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.
		HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
