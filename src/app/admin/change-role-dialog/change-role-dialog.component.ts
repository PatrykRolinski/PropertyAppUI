import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.css']
})
export class ChangeRoleDialogComponent implements OnInit {
roles=["Admin", "Manager", "Member"];
role:any
userEmail:any
userId:any
@Input() user:any
  constructor(private userService: UserService, private adminService:AdminService, @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<ChangeRoleDialogComponent>) {
  {
    this.role=data.role
    this.userEmail=data.email
    this.userId=data.userId
    }
   }

  ngOnInit(): void {
   
  }

  onSubmit(){
        this.adminService.ChangeRole(this.userId, this.role).subscribe();
        window.location.reload();
  }
  close() {
    this.dialogRef.close();
}
}
