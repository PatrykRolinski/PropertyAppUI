import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Property } from '../_models/property';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }
  baseUrl= environment.apiUrl;
  property: Property[]= [];

  AddLike(propertyId){
       return this.http.post(this.baseUrl + "user/property/" + propertyId + "/like", {})
  }
UnLike(propertyId){
  return this.http.delete(this.baseUrl + "user/property/" + propertyId + "/like", {})
}

  GetLike(propertyId){
    return this.http.get<boolean>(this.baseUrl + "user/property/" + propertyId + "/like")
  }



  getLikedProperties(userParams :UserParams){
    let params= this.getPaginationHeaders(userParams)
    return this.getPaginetedResult<Property[]>(this.baseUrl + "user/likes",params)
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

  private getPaginationHeaders(userParams:UserParams){
    let params= new HttpParams();   
     params= params.append("pageNumber", userParams?.pageNumber?.toString());
     params=params.append("pageSize", userParams?.pageSize?.toString())
     if(userParams?.country!==null){
      params= params.append("country", userParams?.country?.toString())
    }
    if(userParams?.city!==null){
      params= params.append("city", userParams?.city?.toString())
    }
    if(userParams?.minimumPrice!==null){
      params= params.append("minimumPrice", userParams?.minimumPrice?.toString())
    }
    if(userParams?.maximumPrice!==null){
      params= params.append("maximumPrice", userParams?.maximumPrice?.toString())
    }
    if(userParams?.minimumSize!==null){
      params= params.append("minimumSize", userParams?.minimumSize?.toString())
    }
    if(userParams?.maximumSize!==null){
      params= params.append("maximumSize", userParams?.maximumSize?.toString())
    }
    if(userParams?.propertyStatus!==null){
      params= params.append("propertyStatus", userParams?.propertyStatus?.toString())
    }
    if(userParams?.marketType!==null){
      params= params.append("marketType", userParams?.marketType?.toString())
    }
    if(userParams?.propertyType!==null){
      params= params.append("propertyType", userParams?.propertyType?.toString())
    }
    if(userParams?.sortBy==="min"){
      params= params.append("sortBy", "Price")
      params= params.append("sortOrder", "Ascending")
    }
    if(userParams?.sortBy==="max"){
      params= params.append("sortBy", "Price")
      params= params.append("sortOrder", "Descending")
    }
    if(userParams?.sortBy==="new"){
      params= params.append("sortBy", "Date")
      params= params.append("sortOrder", "Descending")
    }
    if(userParams?.sortBy==="old"){
      params= params.append("sortBy", "Date")
      params= params.append("sortOrder", "Ascending")
    }
     return params;
    
  }



}
