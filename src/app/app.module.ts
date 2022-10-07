import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './producs-list/products/products.component';
import { ProductDetailComponent } from './producs-list/products/product-detail/product-detail.component';
import { AuthComponent } from './auth/auth.component';

import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ProducsListComponent } from './producs-list/producs-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarComponent } from './shared/rating.component';
import { DescriptionPipe } from './shared/description.pipe';
import { TitleShortPipe } from './shared/title-short.pipe';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    AuthComponent,
    NavigationComponent,
    ProducsListComponent,
    StarComponent,
    LoadingSpinnerComponent,
    DescriptionPipe,
    TitleShortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
