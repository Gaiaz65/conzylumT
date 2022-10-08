import { ProductsService } from './../services/products.service';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material.module';
import { DescriptionPipe } from '../shared/description.pipe';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { StarComponent } from '../shared/rating.component';
import { TitleShortPipe } from '../shared/title-short.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    StarComponent,
    ProductComponent,
    ProductsComponent,
    ProductDetailComponent,
    DescriptionPipe,
    TitleShortPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ],
  exports: [
    StarComponent,
    ProductComponent,
    ProductsComponent,
    LoadingSpinnerComponent,
    ProductDetailComponent,
    DescriptionPipe,
    TitleShortPipe,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
