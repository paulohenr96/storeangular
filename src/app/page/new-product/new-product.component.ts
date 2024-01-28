import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  newProduct: Product = new Product();
  idProduct: Number = -1;
  error: Boolean = false;
  msg: string[] = [];
  msgSucesso: string = '';
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private service: ProductServiceService
  ) {}
  ngOnInit(): void {
    var param = this.activatedRouter.snapshot.paramMap.get('idProduct');
    if (param) {
      this.getProduct(Number.parseInt(param));
      return;
    }
    this.activatedRouter.params.subscribe((p) => {
      if (p['id']) {
        this.getProduct(p['id']);
        return;
      }
    });
    this.newProduct = new Product();
  }
  cleanForm() {
    this.newProduct = new Product();
  }

  saveProduct() {
    if (this.validate()) {
      this.service.saveproduct(this.newProduct).subscribe(
        (data: any) => {
          this.msgSucesso = 'The product was added to the inventory';
          this.newProduct = new Product();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.msg.push(`Internal error (${error.status})=> ${error.error}`);
        }
      );
    }
    // alert(this.newProduct.category);
  }

  getProduct(id: number) {
    this.service.getProduct(id).subscribe(
      (data: Product) => {
        this.newProduct = data;
        console.log(this.newProduct);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.msg.push(`Internal error (${error.status})=> ${error.error}`);
      }
    );
  }

  validate(): boolean {
    this.msg = [];
    if (!this.newProduct.name) {
      this.msg.push('Invalid name...');
    }
    if (isNaN(this.newProduct.quantity!) || this.newProduct.quantity <= 0) {
      this.msg.push('Invalid quantity...');
    }
    if (isNaN(this.newProduct.price!) || this.newProduct.price <= 0) {
      this.msg.push('Invalid price...');
    }
    if (!this.newProduct.category) {
      this.msg.push('Invalid category...');
    }
    return this.msg.length == 0;
  }

  editProduct() {
    if (this.validate()) {
      this.service.editProduct(this.newProduct).subscribe(
        () => {
          this.idProduct = -1;
          this.newProduct = new Product();
          this.msgSucesso = 'The product was successful edited.';
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.msg.push(`Internal error (${error.status})=> ${error.error}`);
        }
      );
    }
  }
}
