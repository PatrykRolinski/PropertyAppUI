import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
properties:any;
  constructor(private propertyService:PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe(respose=>{
      this.properties=respose;
    }, error=>{
      console.log(error)
    });
    
  }

}
