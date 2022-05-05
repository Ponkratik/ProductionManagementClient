import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  form: any = {
    username: '',
    password: '',
    fio: '',
    departmentByDepartmentId: null
  };

  departments?: Department[];
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private authService: AuthService, private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe({
      next: data => {
        this.departments = data;        
      }
    });
  }

  onSubmit(event: any) {
    this.form.departmentByDepartmentId = this.departments!.filter((department: Department) => department.departmentNameLocal.includes(event.target.departmentByDepartmentId.value))[0];

    this.save();
  }

  save() {
    this.authService.register(this.form.username, this.form.password, this.form.fio, this.form.departmentByDepartmentId).subscribe({
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

  navigateToList() {
    this.router.navigate(['usermanagement']);
  }

}
