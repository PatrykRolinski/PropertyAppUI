import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { PhotoService } from 'src/app/_services/photo.service';

@Component({
  selector: 'app-photo-manager',
  templateUrl: './photo-manager.component.html',
  styleUrls: ['./photo-manager.component.css']
})
export class PhotoManagerComponent implements OnInit {
photos : Photo[]=[];

propertyId:string = this.route.snapshot.paramMap.get('id');
  constructor(private photoService:PhotoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(){    
this.photoService.loadPropertiesPhoto(this.propertyId).subscribe({
  next: response=> this.photos=response
})
}



deleteMethod(photoId:any){
  if(confirm("Are you sure to delete photo ?"))
this.photoService.deletePhoto(this.propertyId,photoId ).subscribe({
  complete:()=> this.reloadComponent()
}
)
}

setAsMain(photoId:any){
  if(confirm("Are you sure to change main photo ?"))
  this.photoService.setAsMainPhoto(this.propertyId, photoId).subscribe({
    complete:()=> this.reloadComponent()
  }
  )
}

reloadComponent() {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(["property/"+this.propertyId+ "/photo-manager"]);
}


myFiles:string [] = [];
myForm = new FormGroup({  
  file: new FormControl('', [Validators.required])
});


uploadFile(event) {
   
  for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
  }
}

submit(){
  const formFiles = new FormData();
 
    for (var i = 0; i < this.myFiles.length; i++) { 
      formFiles.append("formFiles", this.myFiles[i]);
    }
   this.photoService.addPhoto(this.propertyId, formFiles).subscribe()
}
}