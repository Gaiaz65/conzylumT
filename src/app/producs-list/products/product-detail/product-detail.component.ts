import { Product } from './../../../models/response-data.model';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  id!: number;
  isLoading = false;
  imgLoading = true;

  constructor(
    config: NgbCarouselConfig,
    private route: ActivatedRoute,
    private router: Router,
    private productsServie: ProductsService
  ) {
    config.wrap = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productsServie.getSpecificProduct(this.id).subscribe((product) => {
        this.product = product;
        this.isLoading = false;
        setTimeout(() => {
          this.imgLoading = false;
        }, 1000);

      });
    });
  }

  ngAfterViewChecked(){
  if (!this.imgLoading){
    this.imgLoading = false;
  }
  };
}







