import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private service: ProductServiceService
  ) {}
  ngOnInit(): void {
    var param = this.activatedRouter.snapshot.paramMap.get('idProduct');
    if (param != null && param != undefined) {
      this.idProduct = Number.parseInt(param);
      this.getProduct();
      return;
    }
    this.newProduct = new Product();
  }
  cleanForm() {
    this.newProduct = new Product();
  }

  saveProduct() {
    if (this.validate()) {
      this.service
        .saveproduct(this.newProduct)
        .subscribe((this.newProduct = new Product()));
    }
    // alert(this.newProduct.category);
  }

  getProduct() {
    this.service.getProduct(this.idProduct).subscribe((data: Product) => {
      this.newProduct = data;
      console.log(this.newProduct);
    });
  }

  validate(): boolean {
    this.error = false;
    this.msg = [];
    if (
      this.newProduct.name == undefined ||
      this.newProduct.name.trim() == ''
    ) {
      this.msg.push('Invalid name...');
      this.error = true;
    }
    if (
      this.newProduct.quantity == undefined ||
      isNaN(this.newProduct.quantity)
    ) {
      this.msg.push('Invalid quantity...');
      this.error = true;
    }
    if (this.newProduct.price == undefined || isNaN(this.newProduct.price)) {
      this.msg.push('Invalid price...');
      this.error = true;
    }

    return !this.error;
  }

  editProduct() {
    if (this.validate()) {
      this.service.editProduct(this.newProduct).subscribe(() => {
        this.idProduct = -1;
        this.newProduct = new Product();
        this.router.navigate(['/product']);
      });
    }
  }
}
