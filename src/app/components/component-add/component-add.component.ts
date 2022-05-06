import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-component-add',
  templateUrl: './component-add.component.html',
  styleUrls: ['./component-add.component.css']
})
export class ComponentAddComponent implements OnInit {
  form: any = {
    name: '',
    unit: ''
  };
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private componentService: ComponentService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(event: any) {
    this.save();
  }

  save() {
    this.componentService.add(this.form).subscribe({
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
    this.router.navigate(['componentmanagement']);
  }

}
