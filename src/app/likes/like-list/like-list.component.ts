import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { LikeService } from 'src/app/_services/like.service';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-like-list',
  templateUrl: './like-list.component.html',
  styleUrls: ['./like-list.component.css']
})
export class LikeListComponent implements OnInit {

  properties:any;
  pagination:Pagination;
  userParams:UserParams
  sortBy:string="new"
  
  marketTypes: string[] = ['Primary', 'Secondary'];
  propertyStatus: string[]= ["Sale", "Rent"]
  propertytypes:string[]=["Flat","House", "Garage","Castle"]
  
  
    constructor(private likeService:LikeService, private _router: Router) {
      this.userParams=new UserParams();
     }
  
    ngOnInit(): void {
      this.loadProperties();
    }
  loadProperties(){
      this.likeService.getLikedProperties(this.userParams).subscribe(response=> {
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

   resetFilter(){
    this.userParams=new UserParams();
     this.loadProperties();
   }

   clickEvent(){     
     this.loadProperties()
this.reloadComponent();
   }

   reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/user/likes']);
}
}
