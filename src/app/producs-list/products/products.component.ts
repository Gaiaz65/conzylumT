
import { Product } from './../../models/response-data.model';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() product!: Product;
  @Input() id!: number;
  imgLoading = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.imgLoading = false;
    }, 700);
  }
}
