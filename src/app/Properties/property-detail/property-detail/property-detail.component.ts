import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { SendMessage } from 'src/app/_models/helperMessage';
import { PropertyDetails } from 'src/app/_models/propertydetails';
import { MessageService } from 'src/app/_services/message.service';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
property:PropertyDetails;
images: GalleryItem[];
num:number;
clicked:boolean= true;
messageContent: SendMessage= new SendMessage();

  constructor(private propertyService: PropertyService, private messageService:MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProperty();
  }
  loadProperty(){
    let id:string = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe(resposne=>{
      this.property=resposne;
      this.images = [
      ];
      for(let i=0; i<this.property.photos.length; i++){
        this.images.push(new ImageItem({ src: this.property.photos[i].url, thumb: '../../../../assets/defaultimage.jpg' }))
        
    }
    })
  }
SendMessage(){
  let id = this.route.snapshot.paramMap.get('id');
  this.messageContent.propertyId=id;
  this.messageContent.recipientId=this.property.createdById;
  this.messageService.sendMessage(this.messageContent).subscribe();
  this.clicked=false;
}

  pictNotLoading(event) { event.target.src = "../../../../assets/defaultimage.jpg" }
}
