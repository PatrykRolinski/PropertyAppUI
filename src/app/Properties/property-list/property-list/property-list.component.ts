import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Property } from 'src/app/_models/property';
import { PropertyService } from 'src/app/_services/property.service';
import {PageEvent} from '@angular/material/paginator'
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
properties:any;
pagination:Pagination;
userParams:UserParams
sortBy:string="new"

marketTypes: string[] = ['Primary', 'Secondary'];
propertyStatus: string[]= ["Sale", "Rent"]
propertytypes:string[]=["Flat","House", "Garage","Castle"]


  constructor(private propertyService:PropertyService) {
    this.userParams=new UserParams();
   }

  ngOnInit(): void {
    this.loadProperties();
  }
loadProperties(){
  
this.propertyService.getProperties(this.userParams).subscribe(response=> {
  this.properties = response.result;
  this.pagination=response.pagination;
}  )
}

onPageChange(event :any){
   this.userParams.pageNumber=event.pageIndex+1;
  this.userParams.pageSize=event.pageSize
  this.loadProperties();
}

setSorting(event){
  this.userParams.sortBy= event.target.value
 } 

}