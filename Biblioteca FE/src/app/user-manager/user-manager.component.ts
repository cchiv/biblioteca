import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';
import { Router } from '@angular/router';
import { Book } from 'src/model/book';
import { utenteService } from 'src/service/utenteService';
import { bookService } from 'src/service/bookService';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  user: User;
  users: User[];
  formInput: FormGroup;
  isFormInputViewActive: boolean; // false = form, true = list
  isNewInsert: boolean; 
  libriDisponibili: Book[];
  libriInPrestito: Book[];
  INITIAL_USER_STATE: User = {nome: null, cognome: null, residenza: null};
  activeUser: User;
  showModal: boolean;
  
  constructor(protected formBuilder: FormBuilder,  protected http: HttpClient, protected router: Router, protected utenteService: utenteService, protected bookService: bookService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAll();
    this.getAllAvailableBooks().then(
      (result) => {
        this.libriDisponibili = result.filter(this.isAvailable);
    })
  }

  buildForm() {
    this.formInput = this.formBuilder.group({
      nome: [null, Validators.required],
      cognome: [null, Validators.required],
      residenza: [null, Validators.required]
    });
  } 

  getAll() {
    this.utenteService.getAll().subscribe(
      result => this.users = result
    )
  }

  getByUserId(id: number){
    this.utenteService.read(id).subscribe(
      result => this.user = result
    )
  }

  delete(id: number) {
    this.utenteService.delete(id).subscribe();
    this.refresh();
  }

  insertUser(user: User) {
    this.utenteService.insert(user).subscribe();
    this.buildForm();
  }

  modifyUser(user: User){
    this.utenteService.update(user).subscribe();
    this.refresh();
  }

  getAllAvailableBooks() {
    return this.bookService.getAll().toPromise();
  }

  findByCognome(cognome: String){
    this.utenteService.findByCognome(cognome).subscribe(
      result => this.users = result
    )
  }
  
  sendUser(event) {
    event.stopPropagation();
    if (this.formInput.valid && this.isNewInsert){
      this.insertUser(this.formInput.value);
    }
    else if (this.formInput.valid && !this.isNewInsert) {
      this.modifyUser(this.formInput.value); 
    }
    else{
      alert("form non è valido")
    }
  }

  showListOrInputForm(isFormInputViewActive: boolean){
    this.isFormInputViewActive = isFormInputViewActive;
    if(isFormInputViewActive){ // list
      this.getAll(); 
    }
    else { // insert
      this.buildForm();
      this.isNewInsert = true;
    }
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  refresh() {
      this.router.navigateByUrl('/dashboard', {skipLocationChange: true}).then(()=>
      this.router.navigate(["utenti"]));
  }

  edit(selectedUser: User) {
    this.showListOrInputForm(false);
    this.isNewInsert = false;
    this.formInput = this.formBuilder.group({
      id: [selectedUser.id],
      nome: [selectedUser.nome, Validators.required],
      cognome: [selectedUser.cognome, Validators.required],
      residenza: [selectedUser.residenza, Validators.required],
      libro: [selectedUser.libro]
    });
  }

  isAvailable(book){
    return book.disponibile == 1;
  }

  setActive(user: User){
    this.libriInPrestito = [];
    user.libro.forEach(libro => {
      this.libriInPrestito.push(libro);
    })
  }

  searchSurname(e){
    if(e.target.value == '')
      this.getAll()
    else 
      this.findByCognome(e.target.value);
  }

}
