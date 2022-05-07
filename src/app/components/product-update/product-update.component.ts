import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  form: any = {
    productName: '',
    unit: '',
    productType: ''
  }
  
  isSuccessful = false;
  errorMessage = '';

  id!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
      }
    });
  }

  onSubmit(event: any) {
    this.save();
  }

  save() {
    this.productService.update(this.id, this.form).subscribe({
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
    this.productService.delete(this.id).subscribe({
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
    this.router.navigate(['productmanagement']);
  }

}
