import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './producs-list/products/product-detail/product-detail.component';
import { ProducsListComponent } from './producs-list/producs-list.component';
import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'products',
    component: ProducsListComponent,
    canActivate: [AuthGuard],
  },

  { path: 'product-detail/:id', component: ProductDetailComponent},


  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
