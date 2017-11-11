import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './quotes/contact-details/contact-details.component';
import { QuoteDetailsComponent } from './quotes/quote-details/quote-details.component';
import { QuoteListComponent } from './quotes/quote-list/quote-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    QuoteDetailsComponent,
    QuoteListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
