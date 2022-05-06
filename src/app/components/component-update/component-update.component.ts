import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-component-update',
  templateUrl: './component-update.component.html',
  styleUrls: ['./component-update.component.css']
})
export class ComponentUpdateComponent implements OnInit {
  form: any = {
    name: '',
    unit: ''
  };

  isSuccessful = false;
  errorMessage = '';

  id!: number;

  constructor(private componentService: ComponentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.componentService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
      }
    });
  }

  onSubmit(event: any) {
    this.save();
  }

  save() {
    this.componentService.update(this.id, this.form).subscribe({
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
    this.componentService.delete(this.id).subscribe({
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
    this.router.navigate(['componentmanagement']);
  }

}
