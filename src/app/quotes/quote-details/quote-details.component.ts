import { Component, Input } from '@angular/core';
import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css'],
})
export class QuoteDetailsComponent implements OnInit {
  @Input()
  quote: Quote;
  
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
    
  constructor(private quoteService: QuoteService) { }

  createQuote(quote: Quote) {
    this.quoteService.createQuote(quote).then((newQuote: Quote) => {
      this.createHandler(newQuote);
    });
  }

  updateQuote(quote: Quote): void {
    this.quoteService.updateQuote(quote).then((updatedQuote: Quote) => {
      this.updateHandler(updatedQuote);
    });
  }

  deleteQuote(quoteId: String): void {
    this.quoteService.deleteQuote(quoteId).then((deletedQuoteId: String) => {
      this.deleteHandler(deletedQuoteId);
    });
  }

}
