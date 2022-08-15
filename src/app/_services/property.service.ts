import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Property } from '../_models/property';
import { PropertyDetails } from '../_models/propertydetails';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
baseUrl= environment.apiUrl;
property: Property[]= [];
paginatedResult:PaginatedResult<Property[]>= new PaginatedResult<Property[]>();
  constructor(private http: HttpClient) { }

  getProperties(pageNumber?:number, pageSize?:number){
    let params= new HttpParams();

    if(pageNumber!== null && pageSize!==null){

     params= params.append("pageNumber", pageNumber?.toString());
     params=params.append("pageSize", pageSize?.toString())
    }



    return this.http.get<Property[]>(this.baseUrl + "property", {observe:'response', params}).pipe(map(response=>{
      this.paginatedResult.result = response.body;
      if(response.headers.get("Pagination") !==null){
        this.paginatedResult.pagination= JSON.parse(response.headers.get("Pagination"))
      }
      return this.paginatedResult;
    }))
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
