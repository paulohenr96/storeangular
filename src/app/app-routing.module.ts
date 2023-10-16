import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesformComponent } from './components/salesform/salesform.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard'; // Importe o AuthGuard

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
