import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPlan } from '../models/user-plan.model';

const API = 'http://localhost:8070/api/user_plan/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserPlanService {

  constructor(private http: HttpClient) { }

  getAllById(id: number): Observable<UserPlan[]> {
    return this.http.get<UserPlan[]>(API + 'get/all/' + id, httpOptions);
  }

  deleteAllById(id: number): Observable<UserPlan[]> {
    return this.http.delete<UserPlan[]>(API + 'delete/all/' + id, httpOptions);
  }

  updateById(id: number, user_plans: any) {
    return this.http.put(API + 'update/' + id, user_plans, httpOptions);
  }
}
