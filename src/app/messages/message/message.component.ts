import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { HelperMessage } from 'src/app/_models/helperMessage';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
message:Message[];
helperMessage:HelperMessage=new HelperMessage();
readed:boolean=false
@Input() containter:string;
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.GetMessages();
  }

GetMessages(){
  this.messageService.loadMessages(this.containter).subscribe(res=>{
    this.message=res
  })
}
secondPersonId(){ 
  this.helperMessage.senderId=this.message[0].senderId
  this.helperMessage.propertyId=this.message[0].propertyId
  this.helperMessage.clicked=true  
  this.readed=true
  this.helperMessage.reciepientId=this.message[0].recipientId
  this.messageService.HelperMessage.next(this.helperMessage)
 
}

}
