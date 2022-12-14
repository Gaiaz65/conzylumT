import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  destroySubscriptions$: Subject<boolean> = new Subject<boolean>();
  products: Product[] = [];
  isLoading = false;

  length!: number;
  event!: PageEvent;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 30];
  public pageSlice!: Observable<Product[]>;

  constructor(
    private auth: AuthService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.auth.authCheck()) {
      this.isLoading = true;
      this.productsService
        .getProducts()
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe((productsResponse) => {
          const { products, total } = productsResponse;
          this.products = products;
          this.pageSlice = of(this.products.slice(0, 10));
          this.length = total;
          this.isLoading = false;
        });
    }
  }

  loadMoreProducts(event: PageEvent, startIndex: number, endIndex: number) {
    this.isLoading = true;
    this.productsService
      .getMoreProducts(event.pageSize, this.products.length)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(
        (response) => {
          let newProducts = response.products;

          this.products = [...this.products, ...newProducts];
          this.pageSlice = of(this.products.slice(startIndex, endIndex));

          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.snackBar.open(
            'Unexpected error occured! Check your internet connection and try again later'
          );
        }
      );
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.products.length) {
      this.loadMoreProducts(event, startIndex, endIndex);
      return;
    }
    this.pageSlice = of(this.products.slice(startIndex, endIndex));
    window.scrollTo(0, 0);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  ngOnDestroy() {
    this.destroySubscriptions$.next(true);
    this.destroySubscriptions$.unsubscribe();
  }
}
