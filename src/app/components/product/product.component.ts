import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/pageproduct';
import { Product } from 'src/app/model/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any;
  numbers: number[] = [];
  isAdmin: boolean = false;
  constructor(private router: Router, private service: ProductServiceService) {}
  ngOnInit(): void {
    this.getProducts(0);

    this.isAdmin = localStorage.getItem('roles')?.includes('admin')
      ? true
      : false;
  }

  getProducts(page: number) {
    this.service.getProducts(page).subscribe((data: Page) => {
      this.products = data;
      this.numbers = [];
      for (var i = 0; i < this.products.totalPages; i++) {
        this.numbers.push(i);
      }
    });
  }
  deleteProduct(id: number) {
    alert(id);
    this.service.deleteProduct(id).subscribe(() => this.getProducts(0));
  }

  editProduct(product: Number) {
    this.router.navigate(['/product/newproduct', { idProduct: product }]);
  }
}
