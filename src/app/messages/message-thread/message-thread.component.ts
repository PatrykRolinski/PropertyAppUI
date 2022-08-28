import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import jwt_decode from "jwt-decode"
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { SendMessage } from 'src/app/_models/helperMessage';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/_services/property.service';
import { PropertyDetails } from 'src/app/_models/propertydetails';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.css']
})
export class MessageThreadComponent implements OnInit {
property:PropertyDetails;
currentUserToken:any
userId:string
messages:any;
senderId:any
secondPersonId:any
reciepientId:any
propertyId:number
clicked:boolean
messageContent:SendMessage= new SendMessage();


  constructor(private accountService:AccountService, 
    private messageService:MessageService, private router:Router, private propertyService:PropertyService) {
      this.messageService.HelperMessage.subscribe((response=>{
        this.senderId=response?.senderId
        this.propertyId=response?.propertyId
        this.clicked=response.clicked
        this.reciepientId=response.reciepientId
        if(this.senderId){
          this.secondPersonId=this.senderId===this.userId? this.reciepientId : this.senderId
          console.log(this.propertyId)
          this.LoadThread(this.secondPersonId, this.propertyId)        }
       this.GetProperty();
     }))}

  ngOnInit(): void {
    this.GetUserId();
    
    
  }

  GetUserId(){
    this.accountService.currentUser$.pipe(take(1)).subscribe(token=>this.currentUserToken=token);
    var decoded= jwt_decode(this.currentUserToken);
    this.userId=decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    
  }

  LoadThread(senderId, propertyId){
   this.messageService.loadMessageThread(senderId,propertyId).subscribe(res=>{
     this.messages=res["messages"]      
    
   })
  
  }

  SendMessage(){
    this.secondPersonId=this.senderId===this.userId? this.reciepientId : this.senderId 
    this.messageContent.propertyId=this.propertyId
    this.messageContent.recipientId=this.secondPersonId

    this.messageService.sendMessage(this.messageContent).subscribe({
      next: response=> console.log(response),
      error: error=> console.log(error),
      complete: ()=> this.LoadThread(this.secondPersonId, this.propertyId)
    },)
    this.messageContent.content=""
  }

  GetProperty(){
    this.propertyService.getProperty(this.propertyId.toString()).subscribe({
      next:res=>  this.property=res
    })
  }
  }
