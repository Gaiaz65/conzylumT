import { Observable, of } from 'rxjs';
import { Product } from './../models/response-data.model';
import { ProductsService } from './../services/products.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-producs-list',
  templateUrl: './producs-list.component.html',
  styleUrls: ['./producs-list.component.scss'],
})
export class ProducsListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;

  length!: number;
  event!: PageEvent;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 30];
  public pageSlice!: Observable<Product[]>;

  constructor(
    private auth: AuthService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    if (this.auth.authCheck()) {
      this.isLoading = true;
      this.productsService.getProducts().subscribe((res) => {
        const { products, total } = res;
        this.products = products;
        this.pageSlice = of(this.products.slice(0, 10));
        this.length = total;
        this.isLoading = false;
      });
    }
  }

  loadMoreProducts(event: PageEvent, startIndex: number, endIndex:number) {
    this.isLoading = true;
    this.productsService
      .getMoreProducts(event.pageSize, this.products.length)
      .subscribe((response) => {
        response.products.forEach((product) => {
          this.products.push(product);
        });
        this.pageSlice = of(this.products.slice(startIndex, endIndex));
        this.isLoading = false;
        event.pageIndex = endIndex
      });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.products.length) {
      this.loadMoreProducts(event, startIndex, endIndex);
    }
    this.pageSlice = of(this.products.slice(startIndex, endIndex));
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
