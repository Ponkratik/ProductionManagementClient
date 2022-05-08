import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from 'src/app/models/route.model';
import { Observable } from 'rxjs';

const API = 'http://localhost:8070/api/route/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(API + 'get/all/', httpOptions);
  }

  getAllByProductId(id: number): Observable<Route[]> {
    return this.http.get<Route[]>(API + 'get/all/' + id, httpOptions);
  }

  getById(id: number): Observable<Route> {
    return this.http.get<Route>(API + 'get/' + id, httpOptions);
  }

  add(route: Route): Observable<any> {
    return this.http.post(API + 'add/', route, httpOptions);
  }

  update(id: number, route: Route): Observable<any> {
    return this.http.put(API + 'update/' + id, route, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
