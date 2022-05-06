import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.css']
})
export class MachineAddComponent implements OnInit {
  form: any = {
    machineName: '',
    capacity: null,
    departmentByDepartmentId: null
  };

  departments?: Department[];
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private machineService: MachineService, private departmentService: DepartmentService, private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe({
      next: data => {
        this.departments = data;        
      }
    });
  }

  onSubmit(event: any) {
    this.form.departmentByDepartmentId = this.departments!.filter((department: Department) => department.departmentNameLocal.includes(event.target.departmentByDepartmentId.value))[0];
    console.log(this.form);
    this.save();
  }

  save() {
    this.machineService.add(this.form).subscribe({
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
    this.router.navigate(['machinemanagement']);
  }

}
