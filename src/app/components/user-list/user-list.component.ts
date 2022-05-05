import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users?: User[];
  allUsers?: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.userService.getAll().subscribe({
      next: data => {
        this.allUsers = data;
        this.users = this.allUsers;
      },
      error: error => {

      }
    });
  }

  navigateAdd() {
    this.router.navigate(['usermanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['usermanagement/update', id])
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    this.users = this.allUsers?.filter((user: User) =>
      user.username?.toLowerCase().includes(filterValueLower)
      || user.fio?.toLowerCase().includes(filterValueLower)
      || user.departmentByDepartmentId.departmentNameLocal?.toLowerCase().includes(filterValueLower));
  }

}
