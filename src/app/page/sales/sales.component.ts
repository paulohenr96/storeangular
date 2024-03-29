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
  setCancelSale(arg0: any) {
    console.log(arg0);
    this.idCancelSale = arg0;
  }
  page: Page = new Page();
  numbers: number[] = [];
  productSales: ProductSale[] = [];
  isAdmin: Boolean = false;
  idCancelSale: number = 0;
  constructor(private service: SalesService) {}
  ngOnInit(): void {
    this.getSales(0);

    this.isAdmin = sessionStorage.getItem('admin') === 'true';
  }
  cancel() {
    this.service
      .deleteSale(this.idCancelSale)
      .subscribe(() => this.getSales(0));
  }

  getSales(pageNumber: number) {
    if (pageNumber < 0 || (this.page.last && this.page.number < pageNumber))
      return;
    this.service.getSales(pageNumber).subscribe((data: Page) => {
      this.page = data;
      if (pageNumber === 0)
        this.numbers = Array.from(Array(this.page.totalPages).keys());
    });
  }
  getProductSale(sale: Sale) {
    this.productSales = sale.products;
  }
}
