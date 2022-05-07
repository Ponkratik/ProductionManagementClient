import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  form: any = {
    quantity: 1,
    orderDate: null,
    batchId: 0,
    productByProductId: null
  };

  productStr: string = '';

  isSuccessful = false;
  errorMessage = '';

  constructor(private orderService: OrderService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  changeListener(event: any) {
    let files: FileList = event.files;
    if (files && files.length > 0) {
      let file: File = files[0];
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let csvs: string[] = csv.split('\r\n');
        csvs.pop();
        csvs.forEach(element => {
          let str: string[] = element.split(';');
          console.log(str);
          let order: Order = new Order();
          order.orderId = Number.parseInt(str[0]);
          order.quantity = Number.parseInt(str[1]);
          order.orderDate = new Date(str[2]);
          order.batchId = Number.parseInt(str[3]);
          this.productStr = str[4];

          this.load(order);
        });

        this.navigateToList();
      }
    }
  }

  load(tempOrder: Order) {
    this.productService.getById(Number.parseInt(this.productStr)).subscribe({
      next: data => {
        tempOrder.productByProductId = data;
        this.save(tempOrder);
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  save(tempOrder: Order) {
    this.orderService.add(tempOrder).subscribe({
      next: data => {
        
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  navigateToList() {
    this.router.navigate(['ordermanagement']);
  }

}
