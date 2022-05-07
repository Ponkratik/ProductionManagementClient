import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { ComponentAddComponent } from './components/component-add/component-add.component';
import { ComponentUpdateComponent } from './components/component-update/component-update.component';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineAddComponent } from './components/machine-add/machine-add.component';
import { MachineUpdateComponent } from './components/machine-update/machine-update.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    UserAddComponent,
    UserUpdateComponent,
    ComponentListComponent,
    ComponentAddComponent,
    ComponentUpdateComponent,
    MachineListComponent,
    MachineAddComponent,
    MachineUpdateComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductUpdateComponent,
    RouteListComponent,
    OrderListComponent,
    OrderAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
