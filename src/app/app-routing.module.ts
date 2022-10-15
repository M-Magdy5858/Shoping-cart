import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './sharedmod/not-found/not-found.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { ExitGuard } from './guards/exit.guard';

const routes: Routes = [
  { path: '', component: ProductsListComponent, }, //canActivate: [AuthGuard]
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [ExitGuard],
  },
  { path: 'address', component: AddressFormComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
