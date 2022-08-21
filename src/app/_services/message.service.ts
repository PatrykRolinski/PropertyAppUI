import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperMessage } from '../_models/helperMessage';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl= environment.apiUrl
  messages:Message[];
  HelperMessage: Subject<HelperMessage>= new Subject<HelperMessage>();
  constructor(private http: HttpClient) { }

  loadMessages(container:string){
    let params= new HttpParams();
    params= params.append("Container", container)
    return this.http.get<Message[]>(this.baseUrl + "user/message",{params})
  }

  loadMessageThread(senderId, propertyId){
    let params= new HttpParams();
    params= params.append("senderId", senderId)
    params=params.append("propertyId", propertyId)
    return this.http.get(this.baseUrl + "user/message/thread", {params})
  }
  sendMessage(messageContent){
    return this.http.post(this.baseUrl + "user/message", messageContent)
  }

}
