import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/pageproduct';
import { Product } from 'src/app/model/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  search(n: number) {
    if (this.category === '') {
      this.getProducts(n);
      return;
    }
    this.getProductsByCategory(n);
  }
  category: string = '';
  setProductDelete(id: any) {
    this.idDeleteProduct = id;
  }
  products: any;
  numbers: number[] = [];
  isAdmin: boolean = false;
  errors: string[] = [];
  idDeleteProduct: number = 0;
  constructor(private router: Router, private service: ProductServiceService) {}
  ngOnInit(): void {
    this.search(0);
    this.isAdmin = sessionStorage.getItem('admin') === 'true';
  }

  getProducts(page: number) {
    this.service.getProducts(page).subscribe((data: Page) => {
      this.products = data;
      if (page === 0)
        this.numbers = Array.from(Array(this.products.totalPages).keys());

      // this.numbers = [];
      // for (var i = 0; i < this.products.totalPages; i++) {
      //   this.numbers.push(i);
      // }
    });
  }
  deleteProduct() {
    this.service.deleteProduct(this.idDeleteProduct).subscribe(
      () => {
        this.getProducts(0);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errors.push('Not Found');
          return;
        }
        this.errors.push('Internal Error : ' + error.message);
      }
    );
  }

  editProduct(product: Number) {
    this.router.navigate(['/product/newproduct', { idProduct: product }]);
  }

  getProductsByCategory(page: number) {
    this.service.getProductsByCategory(page, this.category).subscribe(
      (data: any) => {
        this.products = data;
        if (page === 0)
          this.numbers = Array.from(Array(this.products.totalPages).keys());
      },
      (error: HttpErrorResponse) => {
        this.errors.push('Internal Error : ' + error.message);
      }
    );
  }
}
