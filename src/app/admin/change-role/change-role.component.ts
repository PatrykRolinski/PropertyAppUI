import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Pagination } from 'src/app/_models/pagination';
import { UserDto } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { ChangeRoleDialogComponent } from '../change-role-dialog/change-role-dialog.component';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {
  pagination:Pagination;
  searchPhrase:string=''
  pageNumber=1;
  pageSize=50;
  users: UserDto[]=[];

  displayedColumns: string[] = ['id', 'email', 'lastName', 'firstName', 'role'];
  dataSource = this.users;
  
  constructor(private adminService:AdminService, private matDialog:MatDialog ) {
    
   }

  ngOnInit(): void {
  this.loadUsers();
  }
  applyFilter(){
    this.adminService.GetUsers(this.searchPhrase, this.pageNumber, this.pageSize).subscribe(res=>{
      this.users=res.result
      this.pagination=res.pagination;
    })
  }

loadUsers(){
  this.adminService.GetUsers(this.searchPhrase, this.pageNumber, this.pageSize).subscribe(res=>{
    this.users=res.result
    this.pagination=res.pagination;
  })
}

  onPageChange(event :any){
    this.pageNumber=event.pageIndex+1;
   this.pageSize=event.pageSize
   this.loadUsers();
 }

 
 openDialog(row){
   const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
   email:row.email,
  role:row.role,
  userId:row.id
};
   this.matDialog.open(ChangeRoleDialogComponent, dialogConfig )
   
 }
}

