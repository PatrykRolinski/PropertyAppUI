import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { _AbstractConstructor } from '@angular/material/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
registerForm:FormGroup;
loginForm:FormGroup;
  constructor(private fb:FormBuilder, public accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
    this.initializeLoginForm();
  }
initializeRegisterForm(){
this.registerForm=this.fb.group({
firstname:['', [Validators.maxLength(50), Validators.required]],
lastname:['', [Validators.maxLength(50), Validators.required]],
email:['', [Validators.required]],
password:["", Validators.required],
confirmpassword:["", [Validators.required, this.matchValues("password")]]})


this.registerForm.controls.password.valueChanges.subscribe(() => {
  this.registerForm.controls.confirmPassword.updateValueAndValidity();

})}

register(){
  console.log("gg")
  this.accountService.register(this.registerForm.value)
}


login(){
  console.log("gg")
  this.accountService.login(this.loginForm.value).subscribe({
    next: response=> console.log(response),
    error: error=> console.log(error),
    complete: ()=> this.router.navigateByUrl('/properties')
  },)
}

initializeLoginForm(){
this.loginForm=this.fb.group({
  email:["", Validators.required],
  password:["", Validators.required]
})
}


matchValues(matchTo: string): ValidatorFn{
  return (control:AbstractControl)=>{
    return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching:true}
  }
}
}
