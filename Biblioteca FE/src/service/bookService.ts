import { AbstractService } from './abstractservice';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/model/book';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class bookService extends AbstractService<Book> {

    constructor(protected http: HttpClient){
        super(http)
        this.type = 'book';
    }
    
    findByTitolo(x: string) {
        return this.http.get<Book[]>(`http://localhost:8080/book/findByTitolo/${x}`);
    }
    
}