import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component } from '../models/component.model';

const API = 'http://localhost:8070/api/component/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Component[]> {
    return this.http.get<Component[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Component> {
    return this.http.get<Component>(API + 'get/' + id, httpOptions);
  }

  add(component: Component): Observable<any> {
    return this.http.post(API + 'add/', component, httpOptions);
  }

  update(id: number, component: Component): Observable<any> {
    return this.http.put(API + 'update/' + id, component, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
  
}
