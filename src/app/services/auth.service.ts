import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

const API = 'http://localhost:8070/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string, fio: string, departmentByDepartmentId: Department): Observable<any> {
    return this.http.post(API + 'signup', {
        username,
        password,
        fio,
        departmentByDepartmentId
      }, httpOptions);
  }
}
