import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyDetails } from 'src/app/_models/propertydetails';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
property:any;
  constructor(private fb:FormBuilder,private route:ActivatedRoute, private propertyService:PropertyService, private router:Router) { }
editForm:FormGroup;
marketTypes: string[] = ['Primary', 'Secondary'];
propertyStatus: string[]= ["Sale", "Rent"]
closedKitchen:boolean[]=[true, false]
propertytypes:string[]=["Flat","House", "Garage","Castle"]

  ngOnInit(): void {    
    this.loadProperty();
    this.initializeForm();
    
   
  }

  loadProperty(){    
    let id:string = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe({
      next:response=> this.property=response,
      error: error=> console.log(error),
      complete:()=> this.initializeForm()
    }

    );
  }



  initializeForm(){
    this.editForm=this.fb.group({
      description:[this.property?.description, [Validators.required,Validators.maxLength(2000)]],
      price:[this.property?.price, Validators.required],
      country:[this.property?.country, Validators.required],
      city:[this.property?.city, Validators.required],
      street:[this.property?.street, Validators.required],
      propertysize:[this.property?.propertySize, Validators.required],
      numberofrooms:[this.property?.numberOfRooms, Validators.required],
      propertystatus:[this.property?.propertyStatus, Validators.required],
      markettype:[this.property?.marketType, Validators.required],
      propertytype:[this.property?.propertyType, Validators.required],
      closedkitchen:[this.property?.closedKitchen, Validators.required] ,    
      floor:[this.property?.floor]
  
    })

}

edit(){
let id:string = this.route.snapshot.paramMap.get('id');
this.propertyService.updateProperty(this.editForm.value, id).subscribe({
  complete:()=> this.router.navigateByUrl("user/properties")

}
);

}
}
