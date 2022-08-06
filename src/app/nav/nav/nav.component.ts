import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserLogin } from 'src/app/_models/userlogin';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:UserLogin={email:"", password:""};
currentUser$:Observable<User>;
  constructor(public accountService:AccountService, private http:HttpClient) { }

  ngOnInit(): void {
    
  }
login(){
this.accountService.login(this.model).subscribe();
console.log("email:"+this.model.email + " password:"+ this.model.password )
this.model.email="";
this.model.password="";

}
logOut(){
  this.accountService.logout();
 }

}
