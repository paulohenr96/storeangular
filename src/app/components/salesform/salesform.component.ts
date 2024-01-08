import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/pageproduct';
import { ProductSale } from 'src/app/model/productsale';
import { Sale } from 'src/app/model/sale';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { SalesService } from 'src/app/service/sales.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/model/product';

import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-salesform',
  templateUrl: './salesform.component.html',
  styleUrls: ['./salesform.component.css'],
})
export class SalesformComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  texto: string = '';
  dateSelected?: Date;
  newSale: Sale = new Sale();
  productSale: ProductSale = new ProductSale();
  error: Boolean = false;
  msg: String[] = [];
  products: Page = new Page();
  totalPrice: number = 0;
  numbers: number[] = [];
  selectedProduct: Product = new Product();
  modalRef: BsModalRef = new BsModalRef();
  constructor(
    private productService: ProductServiceService,
    private service: SalesService,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.getProducts(0);
  }

  saveSale() {
    if (!this.verify()) {
      return;
    }
    this.setDate();

    this.msg = [];
    this.service.saveSales(this.newSale).subscribe(() => this.getProducts(0));
    this.resetSale();
  }
  selectProduct(p: Product) {
    this.productSale.productId = p.id;
    this.productSale.productName = p.name;
    this.selectedProduct = p;
  }

  verify(): boolean {
    this.msg = [];
    var error = 0;
    if (this.newSale.buyer == undefined || this.newSale.buyer.trim() == '') {
      this.msg.push('Invalid buyer !');
      error++;
    }
    if (
      this.newSale.products == undefined ||
      this.newSale.products.length == 0
    ) {
      this.msg.push('No products !');
      error++;
    }
    if (this.dateSelected == undefined || this.texto == '') {
      this.msg.push('Select the date !');
      error++;
    }
    return error == 0;
  }
  setDate() {
    var arr = this.texto.split(' ');
    var arrtime = arr[0].split(':');
    var hour = Number.parseInt(arrtime[0]);
    var min = Number.parseInt(arrtime[1]);
    this.dateSelected!.setHours(hour, min, 0);
    this.newSale.date = this.dateSelected;
    console.log(this.dateSelected);
    console.log();
  }
  getProducts(page: number) {
    if (
      this.products != undefined &&
      this.products.last &&
      page > this.products.number
    ) {
      return;
    }
    this.productService.getProducts(page).subscribe((data: any) => {
      this.products = data;
      this.numbers = [];
      for (var i = 0; i < this.products.totalPages; i++) {
        this.numbers.push(i);
      }
    });
  }

  addProduct() {
    if (
      this.productSale == undefined ||
      this.productSale.productId == undefined ||
      this.productSale.quantity == undefined
    ) {
      return;
    }
    if (this.selectedProduct.quantity! < this.productSale.quantity) {
      return;
    }

    this.newSale.products.push(this.productSale);
    this.totalPrice += this.productSale.quantity * this.selectedProduct.price!;
    this.productSale = new ProductSale();
  }

  resetSale() {
    this.totalPrice = 0;
    this.newSale = new Sale();
    this.productSale = new ProductSale();
  }

  onDateSelected(event: any) {
    this.dateSelected = event.value;
  }
}
