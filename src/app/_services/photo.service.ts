import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
baseUrl= environment.apiUrl
  constructor(private http: HttpClient) { }

  loadPropertiesPhoto(propertyId:string){
    return this.http.get<Photo[]>(this.baseUrl + "property/"+ propertyId + "/photo")
  }
  deletePhoto(propertyId:string, photoId:any){
    return this.http.delete(this.baseUrl + "property/" + propertyId + "/photo/" + photoId )
  }
  setAsMainPhoto(propertyId:string, photoId:any){
    return this.http.put(this.baseUrl + "property/" + propertyId + "/photo/set-main-photo/" + photoId, {});
  }
}
