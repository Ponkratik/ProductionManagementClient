import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form: any = {
    productName: '',
    unit: '',
    productType: ''
  }
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    this.save();
  }

  save() {
    this.productService.add(this.form).subscribe({
      next: data => {
        console.log(data);
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
    this.router.navigate(['productmanagement']);
  }

}
