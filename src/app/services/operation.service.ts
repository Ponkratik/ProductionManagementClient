import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation.model';

const API = 'http://localhost:8070/api/operation/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Operation[]> {
    return this.http.get<Operation[]>(API + 'get/all/', httpOptions);
  }

  getAllByRouteId(id: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(API + 'get/all/' + id, httpOptions);
  }

  getById(id: number): Observable<Operation> {
    return this.http.get<Operation>(API + 'get/' + id, httpOptions);
  }

  add(route: Operation): Observable<any> {
    return this.http.post(API + 'add/', route, httpOptions);
  }

  update(id: number, route: Operation): Observable<any> {
    return this.http.put(API + 'update/' + id, route, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
