import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from './models/user.model';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Производственный отдел';

  isLoggedIn = false;
  
  date = new Observable<string>((observer: Subscriber<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
    });

  storedUser: User = new User();

  isTechnologist: boolean = false;
  isDispatcher: boolean = false;
  isSysadmin: boolean = false;
  isPackage: boolean = false;
  isAssembly: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.storedUser.departmentByDepartmentId = user.departmentByDepartmentId;
      this.storedUser.username = user.username;
      this.storedUser.fio = user.fio;

      this.isTechnologist = this.storedUser.departmentByDepartmentId.departmentName == ('ROLE_TECHNOLOGIST');
      this.isDispatcher = this.storedUser.departmentByDepartmentId.departmentName == ('ROLE_DISPATCHER');
      this.isSysadmin = this.storedUser.departmentByDepartmentId.departmentName == ('ROLE_SYSADMIN');
      this.isPackage = this.storedUser.departmentByDepartmentId.departmentName == ('ROLE_MASTER_PACKAGE');
      this.isAssembly = this.storedUser.departmentByDepartmentId.departmentName == ('ROLE_MASTER_ASSEMBLY');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload;
  }
}
