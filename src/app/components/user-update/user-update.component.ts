import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  form: any = {
    username: '',
    fio: '',
    departmentByDepartmentId: null
  };

  departmentStr?: string;
  departments?: Department[];
  
  isSuccessful = false;
  errorMessage = '';

  id!: number;

  loggedUser: User = new User();


  constructor(private authService: AuthService, private userService: UserService, private departmentService: DepartmentService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe({
      next: data => {
        this.departments = data;        
      }
    });

    this.id = this.route.snapshot.params['id'];
    this.userService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
        this.loggedUser = data;
        this.departmentStr = this.form.departmentByDepartmentId.departmentNameLocal;
      }
    });
  }

  onSubmit(event: any) {
    this.form.departmentByDepartmentId = this.departments!.filter((department: Department) => department.departmentNameLocal.includes(event.target.departmentByDepartmentId.value))[0];

    this.save();
  }

  save() {
    this.userService.update(this.id, this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  delete() {
    if (this.loggedUser.username === this.tokenStorageService.getUser().username) {
      
    } else {
      this.userService.delete(this.id).subscribe({
        next: data => {
          this.isSuccessful = true;
        },
        error: error => {
          this.isSuccessful = false;
          this.errorMessage = error.error.message;
        }
      });
    }

    this.navigateToList();
  }

  navigateToList() {
    this.router.navigate(['usermanagement']);
  }

}
