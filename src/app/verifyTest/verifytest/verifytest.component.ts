import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-verifytest',
  templateUrl: './verifytest.component.html',
  styleUrls: ['./verifytest.component.css']
})
export class VerifytestComponent implements OnInit {
token:string
answer:string
baseUrl= environment.apiUrl;
  constructor(private route: ActivatedRoute, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token= params.token;
        
  });

}
verify(){
  
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return this.http.post(this.baseUrl + "Account/verify?token="+ this.token,{responseType: 'text'}).subscribe(response=> {
    this.router.navigateByUrl("");
  }, error=>console.log("oops", error));
  

  ;
 
}
}
 


