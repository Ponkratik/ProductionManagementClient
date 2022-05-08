import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentAddComponent } from './components/component-add/component-add.component';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentUpdateComponent } from './components/component-update/component-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MachineAddComponent } from './components/machine-add/machine-add.component';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineUpdateComponent } from './components/machine-update/machine-update.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'usermanagement', component: UserListComponent },
  { path: 'usermanagement/add', component: UserAddComponent },
  { path: 'usermanagement/update/:id', component: UserUpdateComponent},
  { path: 'componentmanagement', component: ComponentListComponent },
  { path: 'componentmanagement/add', component: ComponentAddComponent },
  { path: 'componentmanagement/update/:id', component: ComponentUpdateComponent},
  { path: 'machinemanagement', component: MachineListComponent },
  { path: 'machinemanagement/add', component: MachineAddComponent },
  { path: 'machinemanagement/update/:id', component: MachineUpdateComponent},
  { path: 'productmanagement', component: ProductListComponent },
  { path: 'productmanagement/add', component: ProductAddComponent },
  { path: 'productmanagement/update/:id', component: ProductUpdateComponent },
  { path: 'routemanagement/:id', component: RouteListComponent },
  { path: 'ordermanagement', component: OrderListComponent },
  { path: 'ordermanagement/add', component: OrderAddComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
