import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductResponse } from './../models/response-data.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpUrl: string = 'https://dummyjson.com/products/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductResponse>(this.httpUrl);
  };

  getMoreProducts(limit: number, itemsLoaded: number) {
    let request = `?limit=${limit}&skip=${itemsLoaded}`;
    return this.http.get<ProductResponse>(this.httpUrl + request);
  };

  getSpecificProduct(id: number) {
    return this.http.get<Product>(this.httpUrl + id);
  };
}
