import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/_services/property.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-created-properties',
  templateUrl: './user-created-properties.component.html',
  styleUrls: ['./user-created-properties.component.css']
})
export class UserCreatedPropertiesComponent implements OnInit {
properties:any;
  constructor(private userService: UserService,private propertyService:PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.userService.GetUserProperties().subscribe(respose=>{
      this.properties=respose;
    }, error=>{
      console.log(error)
    });
  }

deleteMethod(id:any){
  if(confirm("Are you sure to delete ?"))
this.propertyService.deleteProperty(id).subscribe({
  complete:()=> this.reloadComponent()
}
)
}

reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(['user/properties']);
}
}
