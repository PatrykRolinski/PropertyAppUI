import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
baseUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProperties(){
    return this.http.get(this.baseUrl + "property")
  }
}
