import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PropertyDetails } from '../_models/propertydetails';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
baseUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProperties(){
    return this.http.get(this.baseUrl + "property")
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
}
