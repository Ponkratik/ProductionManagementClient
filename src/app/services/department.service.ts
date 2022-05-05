import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

const API = 'http://localhost:8070/api/department/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(API + 'get/' + id, httpOptions);
  }
}
