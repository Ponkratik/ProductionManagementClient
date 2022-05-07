import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders?: Order[];
  allOrders?: Order[];

  sortDir: boolean[] = [false, false, false];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.orderService.getAll().subscribe({
      next: data => {
        this.allOrders = data;
        this.orders = this.allOrders;
      },
      error: error => {

      }
    });
  }

  navigateAdd() {
    this.router.navigate(['ordermanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['ordermanagement/update', id])
  }

  applySort(event: any) {
    //получение всех свойств
    let properties = Object.getOwnPropertyNames(this.orders![0]);
    //ключ сортировки
    let sortKey: string = event.target.id;
    //получение индекса свойства с направлениями сортировки
    let sortColumnId = properties.indexOf(sortKey);

    this.sortDir![sortColumnId] = !this.sortDir![sortColumnId];

    if (this.sortDir![sortColumnId]) {
      this.orders = this.orders!.sort((order1: Order, order2: Order) => {
        const key1 = order1[sortKey as keyof Order];
        const key2 = order2[sortKey as keyof Order];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! > key2! ? 1 : -1;
        }



        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! > key2! ? 1 : -1;
        }

        return 0;
      });
    } else {
      this.orders = this.orders!.sort((order1: Order, order2: Order) => {
        const key1 = order1[sortKey as keyof Order];
        const key2 = order2[sortKey as keyof Order];

        if (typeof key1 === "number" && typeof key2 === "number") {
          return key1! < key2! ? 1 : -1;
        }

        if (typeof key1 === "object" && typeof key2 === "object") {
          return key1! < key2! ? 1 : -1;
        }

        return 0;
      });
    }
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    this.orders = this.allOrders?.filter((order: Order) =>{
      for (var property in order) {
        const value = order[property as keyof Order];

        if (typeof value === "number" && value === Number.parseInt(filterValueLower)) {
          return true;
        }
      }

      return false;
    });
  }
}
