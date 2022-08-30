import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';
import jwt_decode from "jwt-decode"
import { UserDto } from 'src/app/_models/user';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
import { UserChangePasswordDialogComponent } from './user-change-password-dialog/user-change-password-dialog.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  updateForm:FormGroup;
  changePasswordForm:FormGroup
  currentUserToken:any;
  userId:any;
  user:any;
  constructor(private fb:FormBuilder, private userService:UserService, private accountService:AccountService,
     private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.GetUserId();
    this.userService.GetUser(this.userId).subscribe({
      next:response=> this.user=response,
      error: error=> console.log(error),
      complete:()=> this.initializeUpdateForm()
    })
    
    this.initializeChangePasswordForm();
  }

  GetUserId(){
    this.accountService.currentUser$.pipe(take(1)).subscribe(token=>this.currentUserToken=token);
    var decoded= jwt_decode(this.currentUserToken);
    this.userId=decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    this.initializeUpdateForm();
  }
  update(){
    this.userService.UpdateUser(this.updateForm.value, this.userId).subscribe({
      complete:()=> this.matDialog.open(UserUpdateDialogComponent)
    });
  }

  changePassword(){
    this.accountService.changePassword(this.changePasswordForm.value).subscribe({
      complete:()=> this.matDialog.open(UserChangePasswordDialogComponent)
    })
  }

  initializeUpdateForm(){
    this.updateForm=this.fb.group({
    firstname:[this.user?.firstName, [Validators.maxLength(50), Validators.required]],
    lastname:[this.user?.lastName, [Validators.maxLength(50), Validators.required]]})}

  initializeChangePasswordForm(){   
      this.changePasswordForm=this.fb.group({
      password:["", Validators.required],
      confirmpassword:["", [Validators.required, this.matchValues("password")]]})
      
      
      this.changePasswordForm.controls.password.valueChanges.subscribe(() => {
        this.changePasswordForm.controls.confirmPassword.updateValueAndValidity();
      
      })}

      matchValues(matchTo: string): ValidatorFn{
        return (control:AbstractControl)=>{
          return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching:true}
        }
      }

  }





