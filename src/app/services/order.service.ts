import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

const API = 'http://localhost:8070/api/order/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(API + 'get/' + id, httpOptions);
  }

  add(order: Order): Observable<any> {
    return this.http.post(API + 'add/', order, httpOptions);
  }

  update(id: number, order: Order): Observable<any> {
    return this.http.put(API + 'update/' + id, order, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
  
}
