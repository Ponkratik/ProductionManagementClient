import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const API = 'http://localhost:8070/api/product/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(API + 'get/' + id, httpOptions);
  }

  add(product: Product): Observable<any> {
    return this.http.post(API + 'add/', product, httpOptions);
  }

  update(id: number, product: Product): Observable<any> {
    return this.http.put(API + 'update/' + id, product, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
