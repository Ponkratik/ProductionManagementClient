import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationComponent } from '../models/operation-component.model';

const API = 'http://localhost:8070/api/operation_component/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OperationComponentService {

  constructor(private http: HttpClient) { }

  getAllById(id: number): Observable<OperationComponent[]> {
    return this.http.get<OperationComponent[]>(API + 'get/all/' + id, httpOptions);
  }

  deleteAllById(id: number): Observable<OperationComponent[]> {
    return this.http.delete<OperationComponent[]>(API + 'delete/all/' + id, httpOptions);
  }

  updateById(id: number, operation_components: any) {
    return this.http.put(API + 'update/' + id, operation_components, httpOptions);
  }
}
