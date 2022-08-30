import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-change-password-dialog',
  templateUrl: './user-change-password-dialog.component.html',
  styleUrls: ['./user-change-password-dialog.component.css']
})
export class UserChangePasswordDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<UserChangePasswordDialogComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
