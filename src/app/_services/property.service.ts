import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Property } from '../_models/property';
import { PropertyDetails } from '../_models/propertydetails';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
baseUrl= environment.apiUrl;
property: Property[]= [];

  constructor(private http: HttpClient) { }

  getProperties(userParams :UserParams){
    let params= this.getPaginationHeaders(userParams)
    return this.getPaginetedResult<Property[]>(this.baseUrl + "property",params)
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
     if(userParams?.country!==null &&  userParams?.country?.toString()!== ""){
      params= params.append("country", userParams?.country?.toString())
    }
    if(userParams?.city!==null  &&  userParams?.city?.toString()!== ""){
      params= params.append("city", userParams?.city?.toString())
    }
    if(userParams?.minimumPrice!==null  &&  userParams?.minimumPrice?.toString()!== ""){
      params= params.append("minimumPrice", userParams?.minimumPrice?.toString())  
    }
    if(userParams?.maximumPrice!==null && userParams?.maximumPrice.toString()!== ""){
      params= params.append("maximumPrice", userParams?.maximumPrice?.toString())
    }
    if(userParams?.minimumSize!==null  &&  userParams?.minimumSize?.toString()!== ""){
      params= params.append("minimumSize", userParams?.minimumSize?.toString())
    }
    if(userParams?.maximumSize!==null && userParams?.maximumSize?.toString()!== ""){
      params= params.append("maximumSize", userParams?.maximumSize?.toString())
    }
    if(userParams?.propertyStatus!==null && userParams?.propertyStatus?.toString()!== ""){
      params= params.append("propertyStatus", userParams?.propertyStatus?.toString())
    }
    if(userParams?.marketType!==null && userParams?.marketType?.toString()!== ""){
      params= params.append("marketType", userParams?.marketType?.toString())
    }
    if(userParams?.propertyType!==null && userParams?.marketType?.toString()!== ""){
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

console.log(params)
    
     return params;
    
  }




  getProperty(id:string){
    return  this.http.get<PropertyDetails>(this.baseUrl + "property/"+ id)
  }

  createProperty(model:any){
    return this.http.post(this.baseUrl + "property",model)
  }
  updateProperty(model:any, id:string){
    return this.http.put(this.baseUrl + "property/" + id,model)
  }
  deleteProperty(id:string){
    return this.http.delete(this.baseUrl + "property/" + id );
  }
}
