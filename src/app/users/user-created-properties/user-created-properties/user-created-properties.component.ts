import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-created-properties',
  templateUrl: './user-created-properties.component.html',
  styleUrls: ['./user-created-properties.component.css']
})
export class UserCreatedPropertiesComponent implements OnInit {
properties:any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.GetUserProperties().subscribe(respose=>{
      this.properties=respose;
    }, error=>{
      console.log(error)
    });
  }


}
