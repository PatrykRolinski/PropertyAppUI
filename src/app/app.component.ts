import { Component } from '@angular/core';

import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Property App';

  constructor(private accountService:AccountService){  }
  ngOnInit(){
  this.setCurrentUser(); 
  }
 setCurrentUser(){
  const user=JSON.parse(localStorage.getItem("user"))
  this.accountService.setCurrentUser(user);
 }
}
