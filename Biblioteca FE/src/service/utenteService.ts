import { AbstractService } from './abstractservice';
import { User } from 'src/model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class utenteService extends AbstractService<User> {

    constructor(protected http: HttpClient){
        super(http)
        this.type = 'user';
    }

    findByCognome(cognome: String){
       return this.http.get<User[]>(`http://localhost:8080/user/findByCognome/${cognome}`);
    }
}