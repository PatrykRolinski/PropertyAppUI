import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
createForm:FormGroup;
marketTypes: string[] = ['Primary', 'Secondary'];
propertyStatus: string[]= ["Sale", "Rent"]
closedKitchen:string[]=["True", "False"]
propertytypes:string[]=["Flat","House", "Garage","Castle"]

  constructor(private fb:FormBuilder, private propertyService:PropertyService,private router:Router) { }

  ngOnInit(): void {
this.initializeForm()
  }
initializeForm(){
  this.createForm=this.fb.group({
    description:['', [Validators.required,Validators.maxLength(2000)]],
    price:['', Validators.required],
    country:['', Validators.required],
    city:['', Validators.required],
    street:['', Validators.required],
    propertysize:['', Validators.required],
    numberofrooms:['', Validators.required],
    propertystatus:['Sale', Validators.required],
    markettype:['Primary', Validators.required],
    propertytype:['Flat', Validators.required],
    floor:[''],
    closedkitchen:['True', Validators.required],
    photofile:[null]

  })
}
uploadFile(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.createForm.patchValue({
    photofile: file,
  });
  this.createForm.get('photofile').updateValueAndValidity();
}


form(){
  const formData= new FormData();
  formData.append('description', this.createForm.get('description').value)
  formData.append('price', this.createForm.get('price').value)
  formData.append('country', this.createForm.get('country').value)
  formData.append('city', this.createForm.get('city').value)
  formData.append('street', this.createForm.get('street').value)
  formData.append('closedkitchen', this.createForm.get('closedkitchen').value)
  formData.append('photofile', this.createForm.get('photofile').value)
  formData.append('propertysize', this.createForm.get("propertysize").value)
  formData.append('numberofrooms', this.createForm.get("numberofrooms").value)
  formData.append('propertystatus', this.createForm.get("propertystatus").value)
  formData.append('markettype', this.createForm.get("markettype").value)
  formData.append('floor', this.createForm.get("floor").value) 
  formData.append('propertytype', this.createForm.get("propertytype").value)
  
  return formData
}



create(){

this.propertyService.createProperty(this.form()).subscribe({
  next: response=> console.log(response),
  error: error=> console.log(error),
  complete: ()=> this.router.navigateByUrl('user/properties')
},)
}  





}
