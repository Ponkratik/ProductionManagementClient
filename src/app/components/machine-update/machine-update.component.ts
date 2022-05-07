import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine-update',
  templateUrl: './machine-update.component.html',
  styleUrls: ['./machine-update.component.css']
})
export class MachineUpdateComponent implements OnInit {
  form: any = {
    machineName: '',
    capacity: null,
    departmentByDepartmentId: null
  };

  capacityStr: string = '';
  departmentStr: string = '';
  departments?: Department[];
  
  isSuccessful = false;
  errorMessage = '';

  id!: number;

  constructor(private machineService: MachineService, private departmentService: DepartmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe({
      next: data => {
        this.departments = data;        
      }
    });

    this.id = this.route.snapshot.params['id'];
    this.machineService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
        this.departmentStr = this.form.departmentByDepartmentId.departmentNameLocal;
        this.capacityStr = this.form.capacity.substring(11, 16);
      }
    });
  }

  onSubmit(event: any) {
    this.form.departmentByDepartmentId = this.departments!.filter((department: Department) => department.departmentNameLocal.includes(event.target.departmentByDepartmentId.value))[0];

    this.save();
  }

  save() {
    this.machineService.update(this.id, this.form).subscribe({
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
    this.machineService.delete(this.id).subscribe({
      next: data => {
        this.isSuccessful = true;
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });

    this.navigateToList();
  }

  navigateToList() {
    this.router.navigate(['machinemanagement']);
  }

}
