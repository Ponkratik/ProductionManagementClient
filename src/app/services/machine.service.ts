import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine.model';

const API = 'http://localhost:8070/api/machine/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Machine> {
    return this.http.get<Machine>(API + 'get/' + id, httpOptions);
  }

  add(machine: Machine): Observable<any> {
    return this.http.post(API + 'add/', machine, httpOptions);
  }

  update(id: number, machine: Machine): Observable<any> {
    return this.http.put(API + 'update/' + id, machine, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
  
}
