import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/model/book';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';
import { bookService } from 'src/service/bookService';
import { utenteService } from 'src/service/utenteService';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  book: Book;
  books: Book[];
  users: User[];
  formInput: FormGroup;
  switchListInsert: boolean; // true for input form false for list
  switcInsertModifyBook: boolean; // true for insert false for modify
  receiveBook: Book;
  receiveBookRent: Book;
  receiveUser: User;
  serachTitle: string[];
  retrivedBooks: Book[];
  whoHasTheBook: User;
  receiveBookWhoHas: Book;
  selectedIdUser: number;
  showModal: boolean;
  startRent: Date = new Date();
  showModalWhoHasIt: boolean;

  constructor(protected formBuilder: FormBuilder, protected router: Router, protected http: HttpClient,
    protected bookService: bookService, protected utenteService: utenteService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAll();
    this.switchListInsert = true;
    this.whoHasTheBook = null;
    this.receiveBookRent = null;
  }

  buildForm() {
    this.formInput = this.formBuilder.group({
      isbn: [null, Validators.required],
      titolo: [null, Validators.required],
      autore: [null, Validators.required],
      editore: [null, Validators.required],
      genere:  [null, Validators.required],
    });
  }

  getAll(){
    this.bookService.getAll().subscribe(
      result => this.books = result
    )
  }

  getByBookId(id: number) {
    this.bookService.read(id).subscribe(
      result => this.book = result
    )
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe();
    this.refresh();
  }

  insertBook(book: Book) {
    book.disponibile = true;
    this.bookService.insert(book).subscribe();
    this.buildForm();
  }

  modifyBook(book: Book){
    this.bookService.update(book).subscribe();
    this.refresh();
  }

  findByTitolo(x: string) {
    this.bookService.findByTitolo(x).subscribe(
      result => this.books = result
    );
  }

  getAllUser() {
    this.utenteService.getAll().subscribe(
      result => this.users = result
    )
  }

  getByIdUser(idUser: number) {
    return this.utenteService.read(idUser).toPromise();
  }

  sendBook(event) {
    event.stopPropagation();
    if (this.formInput.valid && this.switcInsertModifyBook){
      this.insertBook(this.formInput.value);
    }
    else if (this.formInput.valid && !this.switcInsertModifyBook ) {
      this.modifyBook(this.formInput.value); 
    }
    else{
      alert("form non è valido")
    }
  }

  showListOrInputForm(listOrInputForm: boolean, inserOrModfy: boolean){
    this.switchListInsert = listOrInputForm;
    if(listOrInputForm){
      this.getAll(); 
     }   
      this.switcInsertModifyBook = inserOrModfy;
      this.buildForm();
  }

  backToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  refresh() {
    this.router.navigateByUrl('/book', {skipLocationChange: true}).then(()=>
    this.router.navigate(["book"]));
  }

  edit(selectedBook: Book){
    this.showListOrInputForm(false, false)
    this.getByBookId(selectedBook.id);
    this.formInput = this.formBuilder.group({
     id: [selectedBook.id], 
     isbn: [selectedBook.isbn, Validators.required],
     titolo: [selectedBook.titolo, Validators.required],
     autore: [selectedBook.autore, Validators.required],
     editore: [selectedBook.editore, Validators.required],
     genere: [selectedBook.genere, Validators.required],
     disponibile: [selectedBook.disponibile, Validators.required],
     inizioPrestito: [selectedBook.inizioPrestito],
     utente: [selectedBook.utente]
  });
  }

  receiveBookFunc($event) {
    this.receiveBook = $event;
    this.edit(this.receiveBook);
  }

  recereceiveBookForWhiHasIt($event) {
    this.receiveBookWhoHas = $event;
    this.whoHasTheBook =  this.receiveBookWhoHas.utente;
    this.showModalWhoHasIt = true;
  }

  recivedForRent($event){
    this.getAllUser()
    this.receiveBookRent = $event;
    this.showModal = true;
  }

  searchTitle(e){
    if(e.target.value == '')
      this.getAll()
    else 
      this.findByTitolo(e.target.value);
  }

  confermaPrestito(idUser: number){
    this.selectedIdUser = idUser;
    this.getByIdUser(this.selectedIdUser).then(
      (result) => {
        this.receiveBookRent.utente = result;
        this.receiveBookRent.disponibile = false;
        this.receiveBookRent.inizioPrestito = this.startRent;
        this.bookService.insert(this.receiveBookRent).subscribe();
      }
    );
  }

 restituzione($event){
    this.receiveBook = $event;
    this.receiveBook.utente = null;
    this.receiveBook.disponibile = true;
    this.bookService.insert(this.receiveBook).subscribe();
 }

}