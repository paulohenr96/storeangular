import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './page/product/product.component';
import { NewProductComponent } from './page/new-product/new-product.component';
import { SalesComponent } from './page/sales/sales.component';
import { SalesformComponent } from './page/salesform/salesform.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './auth.guard'; // Importe o AuthGuard
import { UsersComponent } from './page/users/users.component';
import { UserformComponent } from './page/userform/userform.component';
import { MetricsComponent } from './page/metrics/metrics.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'users/form',
    component: UserformComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'users/form/:id',
    component: UserformComponent,
    canActivate: [authGuard],
  },
  {
    path: 'metrics',
    component: MetricsComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: 'sales', component: SalesComponent, canActivate: [authGuard] },
  {
    path: 'sales/form',
    component: SalesformComponent,
    canActivate: [authGuard],
  },

  { path: 'product', component: ProductComponent, canActivate: [authGuard] },
  {
    path: 'product/newproduct',
    component: NewProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product/newproduct/:id',
    component: NewProductComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
