import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'usermanagement', component: UserListComponent },
  { path: 'usermanagement/add', component: UserAddComponent },
  { path: 'usermanagement/update/:id', component: UserUpdateComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
