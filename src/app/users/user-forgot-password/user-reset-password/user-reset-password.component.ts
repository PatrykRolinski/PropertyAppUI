import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup
  token:string;

  constructor(private fb:FormBuilder, private route: ActivatedRoute, private accountService:AccountService,
     private router: Router) { }

  ngOnInit(): void {
    this.initializeChangePasswordForm();
    this.route.queryParams
      .subscribe(params => {
        this.token= params.token;})

  
  }
  

  initializeChangePasswordForm(){   
    this.resetPasswordForm=this.fb.group({
    email:["", Validators.required],
    password:["", Validators.required],
    confirmpassword:["", [Validators.required, this.matchValues("password")]]})
    
    
    this.resetPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.resetPasswordForm.controls.confirmPassword.updateValueAndValidity();
    
    })}

    matchValues(matchTo: string): ValidatorFn{
      return (control:AbstractControl)=>{
        return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching:true}
      }
    }


resetPassword(){

 this.accountService.resetPassword(this.token, this.resetPasswordForm.value).subscribe({
   complete:()=> this.router.navigateByUrl("")
 })


}
}
