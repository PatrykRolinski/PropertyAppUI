import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperMessage } from '../_models/helperMessage';
import { Message } from '../_models/message';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl= environment.apiUrl
  messages:Message[];
  HelperMessage: Subject<HelperMessage>= new Subject<HelperMessage>();
  constructor(private http: HttpClient) { }

  loadMessages(container:string, pageNumber:any, pageSize:any){
    let params= new HttpParams();
    params= params.append("Container", container)
    params= params.append("pageNumber", pageNumber?.toString());
    params=params.append("pageSize", pageSize?.toString())
    return this.getPaginetedResult<Message[]>(this.baseUrl + "user/message",params)
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

  private getPaginetedResult<T>(url, params) {
    const paginatedResult:PaginatedResult<T>= new PaginatedResult<T>();
    return this.http.get<T>(url,{ observe: 'response', params }).pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get("Pagination") !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
      }
      return paginatedResult;
    }));
  }

  

}
