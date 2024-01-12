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
      this.service
        .saveproduct(this.newProduct)
        .subscribe((this.newProduct = new Product()));
    }
    // alert(this.newProduct.category);
  }

  getProduct(id: number) {
    this.service.getProduct(id).subscribe((data: Product) => {
      this.newProduct = data;
      console.log(this.newProduct);
    });
  }

  validate(): boolean {
    this.msg = [];
    if (!this.newProduct.name) {
      this.msg.push('Invalid name...');
    }
    if (isNaN(this.newProduct.quantity!)) {
      this.msg.push('Invalid quantity...');
    }
    if (isNaN(this.newProduct.price!)) {
      this.msg.push('Invalid price...');
    }
    if (!this.newProduct.category) {
      this.msg.push('Invalid category...');
    }
    return this.msg.length == 0;
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
