import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/model/pageproduct';
import { ProductSale } from 'src/app/model/productsale';
import { Sale } from 'src/app/model/sale';
import { SalesService } from 'src/app/service/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  page: Page = new Page();
  numbers: number[] = [];
  productSales: ProductSale[] = [];
  isAdmin: Boolean = false;
  constructor(private service: SalesService) {}
  ngOnInit(): void {
    this.getSales(0);

    this.isAdmin = sessionStorage.getItem('admin') === 'true';
  }
  cancelSale(id: Number) {
    this.service.deleteSale(id).subscribe(() => this.getSales(0));
  }

  getSales(pageNumber: number) {
    console.log(pageNumber);
    if (pageNumber < 0 || (this.page.last && this.page.number < pageNumber))
      return;
    this.numbers = [];
    this.service.getSales(pageNumber).subscribe((data: Page) => {
      console.log('data ', data.content);

      this.page = data;
      for (var i = 0; i < this.page.totalPages; i++) {
        this.numbers.push(i);
      }
    });
  }
  getProductSale(sale: Sale) {
    this.productSales = sale.products;
  }
}
