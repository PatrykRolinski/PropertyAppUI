import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-verifytest',
  templateUrl: './verifytest.component.html',
  styleUrls: ['./verifytest.component.css']
})
export class VerifytestComponent implements OnInit {
token:string
baseUrl= environment.apiUrl;
  constructor(private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token= params.token;
        
  });

}
verify(){
  
  this.http.post(this.baseUrl + "Account/verify?token="+ this.token,[]) //...errors if
  .subscribe();
  console.log(this.token);
}
}
