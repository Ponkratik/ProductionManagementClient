import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products?: Product[];
  allProducts?: Product[];

  sortDir: boolean[] = [false, false, false]; 

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.productService.getAll().subscribe({
      next: data => {
        this.allProducts = data;
        this.products = this.allProducts;
      },
      error: error => {

      }
    });
  }

  navigateAdd() {
    this.router.navigate(['productmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['productmanagement/update', id])
  }

  navigateRoutes(id: number) {
    this.router.navigate(['routemanagement/', id])
  }

  applySort(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.products![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.products = this.products!.sort((product1: Product, product2: Product) => {
        const key1 = product1[sortKey as keyof Product];
        const key2 = product2[sortKey as keyof Product];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() > key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.products = this.products!.sort((product1: Product, product2: Product) => {
        const key1 = product1[sortKey as keyof Product];
        const key2 = product2[sortKey as keyof Product];

        if (typeof key1 === "string" && typeof key2 === "string") {
          return key1!.toLowerCase() < key2!.toLowerCase() ? 1 : -1;
        }

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    this.products = this.allProducts?.filter((product: Product) =>{
      for (var property in product) {
        const value = product[property as keyof Product];
        if (typeof value === "string" && value.toLowerCase().includes(filterValueLower)) {
          return true;
        }

        if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
          return true;
        }
      }

      return false;
    });
  }

}
