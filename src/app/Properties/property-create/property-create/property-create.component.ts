import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})
export class PropertyCreateComponent implements OnInit {
createForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
this.initializeForm()
  }
initializeForm(){
  this.createForm=this.fb.group({
    description:['', Validators.required],
    price:['', Validators.required],
    country:[''],
    city:[''],
    street:[''],
    closedkitchen:[''],
    photofile:['']

  })
}
}
