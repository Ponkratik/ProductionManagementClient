import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    departmentByDepartmentId: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.form.departmentByDepartmentId = this.tokenStorage.getUser().departmentByDepartmentId;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    console.log(this.form);
    this.authService.login(username!, password!).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.form.departmentByDepartmentId = this.tokenStorage.getUser().departmentByDepartmentId;
        this.redirectToHomePage();
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirectToHomePage(): void {
    this.router.navigate(['home']);
  }

}
