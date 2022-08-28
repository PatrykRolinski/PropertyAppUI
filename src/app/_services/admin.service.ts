import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { UserDto } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

 GetUsers(searchPhrase:string, pageNumber:any, pageSize:any){
  let params= new HttpParams();
   params= params.append("pageNumber", pageNumber?.toString());
  params=params.append("pageSize", pageSize?.toString())
  if(searchPhrase!==null &&  searchPhrase!== ""){
    params= params.append("SearchPhrase", searchPhrase)
  }

  return this.getPaginetedResult<UserDto[]>(this.baseUrl + "user",params)
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

ChangeRole(userId, role){
  let reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
 return this.http.put(this.baseUrl +"user/"+ userId +"/role", JSON.stringify(role), {headers:reqHeaders})
}
}
