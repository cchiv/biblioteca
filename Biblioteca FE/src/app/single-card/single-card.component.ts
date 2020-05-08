import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/model/book';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { bookService } from 'src/service/bookService';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit {

  @Input() book: Book;
  @Output() emitBook = new EventEmitter<Book>();
  @Output() emitBookForWhoHasIt = new EventEmitter<Book>();
  @Output() emitBookForRent = new EventEmitter<Book>();
  @Output() emitBookConsegna = new EventEmitter<Book>();
  
  constructor(protected router: Router, protected http: HttpClient, protected bookService: bookService) { }

  ngOnInit(): void {
    
  }
  
  delete(id: number) {
    this.bookService.delete(id).subscribe();
    this.refresh();
  }

  refresh() {
    this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
    this.router.navigate(["book"]));
  }

  edit(book: Book){
    this.emitBook.emit(book);
  }

  whoHasIt(book: Book){
    this.emitBookForWhoHasIt.emit(book);
  }

  rent(book: Book){
    this.emitBookForRent.emit(book);
  }

  consegna(book: Book){
    this.emitBookConsegna.emit(book);
  }

}
