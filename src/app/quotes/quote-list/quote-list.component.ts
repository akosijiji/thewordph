// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';
import { QuoteDetailsComponent } from '../quote-details/quote-details.component';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
})
export class QuoteListComponent implements OnInit {
  
  quotes: Quote[]
  selectedQuote: Quote

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
     this.quoteService
      .getQuotes()
      .then((quotes: Quote[]) => {
        this.quotes = quotes.map((quote) => {
          if (!quote.phone) {
            quote.phone = {
              mobile: '',
              work: ''
            }
          }
          return quote;
        });
      });
  }
  
  private getIndexOfQuote = (quoteId: String) => {
    return this.quotes.findIndex((quote) => {
      return quote._id === quoteId;
    });
  }

  selectQuote(quote: Quote) {
    this.selectedQuote = quote
  }

  createNewQuote() {
    var quote: Quote = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created quote will have the selected state.
    this.selectQuote(quote);
  }

  deleteQuote = (quoteId: String) => {
    var idx = this.getIndexOfQuote(quoteId);
    if (idx !== -1) {
      this.quotes.splice(idx, 1);
      this.selectQuote(null);
    }
    return this.quotes;
  }

  addQuote = (quote: Quote) => {
    this.quotes.push(quote);
    this.selectQuote(quote);
    return this.quotes;
  }

  updateQuote = (quote: Quote) => {
    var idx = this.getIndexOfQuote(quote._id);
    if (idx !== -1) {
      this.quotes[idx] = quote;
      this.selectQuote(quote);
    }
    return this.quotes;
  }

}
