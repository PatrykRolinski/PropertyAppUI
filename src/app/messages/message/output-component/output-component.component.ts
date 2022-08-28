import { Component, Input, OnInit } from '@angular/core';
import { HelperMessage } from 'src/app/_models/helperMessage';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-output-component',
  templateUrl: './output-component.component.html',
  styleUrls: ['./output-component.component.css']
})
export class OutputComponentComponent implements OnInit {

  message:Message[];
  helperMessage:HelperMessage=new HelperMessage();
  readed:boolean=false
  pageSize=6;
  PageNumber=1;
  pagination:Pagination;

  @Input() containter:string;
    constructor(private messageService:MessageService) { }
  
    ngOnInit(): void {
      this.GetMessages();
    }
  
  GetMessages(){
    this.messageService.loadMessages(this.containter, this.PageNumber, this.pageSize).subscribe(res=>{
      this.message=res.result
      this.pagination=res.pagination;      
    })
  }
  secondPersonId(propertyId, senderId, reciepientId){ 
    console.log(senderId, reciepientId)
    this.helperMessage.senderId=reciepientId
    this.helperMessage.propertyId=propertyId;
    this.helperMessage.clicked=true  
    this.readed=true
    this.helperMessage.reciepientId=reciepientId
    this.messageService.HelperMessage.next(this.helperMessage)
   
  }


  onPageChange(event :any){
    this.PageNumber=event.pageIndex+1;
   this.pageSize=event.pageSize
   this.GetMessages()
 }


}
