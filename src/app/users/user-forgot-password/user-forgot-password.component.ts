import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/_services/account.service';
import { UserChangePasswordDialogComponent } from '../user-update/user-change-password-dialog/user-change-password-dialog.component';
import { UserForgotPasswordDialogComponent } from './user-forgot-password-dialog/user-forgot-password-dialog.component';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {
recoverPasswordForm:FormGroup
email:any
  constructor(private fb:FormBuilder, private accountService:AccountService, 
    private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm(){
    this.recoverPasswordForm=this.fb.group({
    email:['', [Validators.required]]})}

recover(){
this.accountService.forgotPassword(this.recoverPasswordForm.value).subscribe({
  complete:()=> this.matDialog.open(UserForgotPasswordDialogComponent)
})
}


}
