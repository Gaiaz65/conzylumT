import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product.model';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: number;
  isLoading = false;

  constructor(
    config: NgbCarouselConfig,
    private route: ActivatedRoute,
    private productsServie: ProductsService,
    private snackBar: MatSnackBar
  ) {
    config.wrap = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productsServie.getSpecificProduct(this.id).subscribe(
        (product) => {
          this.product = product;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.snackBar.open(
            'Unexpected error occured! Check your internet connection and try again later'
          );
        }
      );
    });
  }
}
