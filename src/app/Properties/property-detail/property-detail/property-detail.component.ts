import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetails } from 'src/app/_models/propertydetails';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
property:PropertyDetails;
  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProperty();
  }
  loadProperty(){
    let id:string = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe(resposne=>{
      this.property=resposne;
    })
  }
}
