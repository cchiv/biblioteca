import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSearchVisible: boolean;
  isTitleSearch: boolean;

  @Input() isUserOrBook: string;
  @Output() emitTitleBook = new EventEmitter<string>();
  @Output() emitUserSurname = new EventEmitter<string>();

  private route: string;
  
  constructor(protected router: Router, protected location: Location) { 
    router.events.subscribe(() => {
      if(location.path()!='') {
        this.route = this.location.path();
        switch(this.route){
          case '/book':
            this.isTitleSearch = true;
            break;
          case '/utenti':
            this.isTitleSearch = false;
            break;
          default:
            null;
        }
      }
      else  
        this.route = "dashboard";
    });
  }

  ngOnInit(): void {
    console.log(this.isUserOrBook)
  }

  backToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  searchTitle(e){
    this.emitTitleBook.emit(e);
  }

  searchUser(e){
    this.emitUserSurname.emit(e);
  }

}
