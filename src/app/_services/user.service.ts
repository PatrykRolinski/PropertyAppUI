import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.apiUrl;
  constructor(private http:HttpClient, ) { }

  GetUserProperties(){
    return this.http.get(this.baseUrl + "User/created-properties")
  }

  GetUser(id:any){
    return this.http.get(this.baseUrl + "User/" +id)
  }

  UpdateUser(model:any, id:any){
    return this.http.put(this.baseUrl + "User/" +id, model)
  }
}
