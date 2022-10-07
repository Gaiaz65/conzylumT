import { Product, ProductResponse } from './../models/response-data.model';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts() {
    const productsData$ = new Observable<ProductResponse>((observer) => {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {
          observer.next(data);
        })
        .catch((err) => observer.error(err));
    });
    return productsData$;
  }

  getMoreProducts(limit: number, itemsLoaded: number) {
    let request = `?limit=${limit}&skip=${itemsLoaded}`;

    const productsData$ = new Observable<ProductResponse>((observer) => {
      fetch('https://dummyjson.com/products' + request)
        .then((res) =>
          res.json().then((data) => {
            observer.next(data);
          })
        )
        .catch((err) => observer.error(err));
    });
    return productsData$;
  }

  getSpecificProduct(id: number) {
    const productData$ = new Observable<Product>((observer) => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          observer.next(data);
        })
        .catch((err) => observer.error(err));
    });
    return productData$;
  }
}
