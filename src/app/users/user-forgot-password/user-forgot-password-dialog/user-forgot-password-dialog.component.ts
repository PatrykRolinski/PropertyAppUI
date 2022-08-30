import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-forgot-password-dialog',
  templateUrl: './user-forgot-password-dialog.component.html',
  styleUrls: ['./user-forgot-password-dialog.component.css']
})
export class UserForgotPasswordDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UserForgotPasswordDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
