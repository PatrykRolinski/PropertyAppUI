import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Property } from 'src/app/_models/property';
import { PropertyService } from 'src/app/_services/property.service';
import {PageEvent} from '@angular/material/paginator'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
properties:any;
pagination:Pagination;
pageNumber=1;
pageSize=5;




  constructor(private propertyService:PropertyService) { }

  ngOnInit(): void {
    this.loadProperties();
  }
loadProperties(){
this.propertyService.getProperties(this.pageNumber, this.pageSize).subscribe(response=> {
  this.properties = response.result;
  this.pagination=response.pagination;
}  )
}

onPageChange(event :any){
  console.log(event)
  this.pageNumber=event.pageIndex+1;
  this.pageSize=event.pageSize
  this.loadProperties();
}

}
