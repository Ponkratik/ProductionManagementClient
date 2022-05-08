import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';

const API = 'http://localhost:8070/api/plan/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Plan[]> {
    return this.http.get<Plan[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Plan> {
    return this.http.get<Plan>(API + 'get/' + id, httpOptions);
  }

  add(plan: Plan): Observable<any> {
    return this.http.post(API + 'add/', plan, httpOptions);
  }

  update(id: number, plan: Plan): Observable<any> {
    return this.http.put(API + 'update/' + id, plan, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
  
}
