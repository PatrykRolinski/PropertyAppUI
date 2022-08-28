import { Component, Input, OnInit } from '@angular/core';
import type {Property} from 'src/app/_models/property';
import { LikeService } from 'src/app/_services/like.service';



@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
@Input() property:Property;

  constructor(private likeService:LikeService) { }
like :boolean=false;

  ngOnInit(): void {
    this.GetLike();
  }

pictNotLoading(event) { event.target.src = "../../../../assets/defaultimage.jpg" }



AddLike(){
  this.likeService.AddLike(this.property.id).subscribe({
    complete:()=>this.like=true
  }
  )
}
DeleteLike(){
  this.likeService.UnLike(this.property.id).subscribe({
    complete:()=>(this.like=false)
  })
}

GetLike(){
  this.likeService.GetLike(this.property.id).subscribe({
    next: response=> this.like=response,
    error: error=> console.log(error),
    
})
}



}