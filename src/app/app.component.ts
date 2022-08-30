import { Component } from '@angular/core';
import { take } from 'rxjs';
import jwt_decode from "jwt-decode"
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Property App';
  role:any;
  currentUserToken:any;

  constructor(private accountService:AccountService,){  }
  ngOnInit(){
  this.setCurrentUser(); 
  this.GetUserRole();
  }
 setCurrentUser(){
  const user=JSON.parse(localStorage.getItem("user"))
  this.accountService.setCurrentUser(user);
 }


 GetUserRole(){
  this.accountService.currentUser$.pipe(take(1)).subscribe(token=>this.currentUserToken=token);
  var decoded= jwt_decode(this.currentUserToken);
  this.role=decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}
}
