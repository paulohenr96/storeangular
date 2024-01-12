import {
  FormStyle,
  TranslationWidth,
  getLocaleMonthNames,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Metrics } from 'src/app/model/metrics';
import { Product } from 'src/app/model/product';
import { Sale } from 'src/app/model/sale';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { SalesService } from 'src/app/service/sales.service';
import { UsersService } from 'src/app/service/users.service';
type dataType = {
  xAxis: number[];
  yAxis: number[];
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  total: number = 0;
  count: Number = 0;
  totalQuantity: Number = 0;
  percentual: number = 0;
  goalIncome: number = 0;
  chartData: any[] = [];
  productsRepo: Product[] = [];
  month: string = '';
  months: string[] = [];
  year: number = 2024;
  isAdmin: boolean = false;
  constructor(
    private service: SalesService,
    private userService: UsersService,
    private productService: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.months = getLocaleMonthNames(
      'en-us',
      FormStyle.Standalone,
      TranslationWidth.Wide
    ).map((e) => e);
    this.isAdmin = sessionStorage.getItem('admin') === 'true';
    this.findMonth();
    this.getInfo();
    this.getChart(this.year);
    this.checkQuantity();
    console.log(this.months);
  }
  findMonth() {
    this.month = this.months[new Date().getMonth()];
  }
  getInfo() {
    this.productService.getInfo().subscribe((data: any) => {
      if (data != null) {
        console.log(data);
        this.count = data.totalProduct;
        this.totalQuantity = data.sumQuantity;
        this.total = data.income ? data.income : 0;

        this.setGoal();
      }
    });
  }
  setGoal() {
    if (this.isAdmin) {
      this.userService.getMetrics().subscribe((data: Metrics) => {
        console.log(data);
        const goal = data.monthlyGoal;
        this.calculatePercentual(goal);
      });
      return;
    }
    const goal = parseInt(sessionStorage.getItem('goal')!);
    this.calculatePercentual(goal);
  }
  calculatePercentual(goal: number) {
    this.percentual = (100 * this.total) / goal;
    if (this.percentual > 100) {
      this.percentual = 100;
    }
  }

  getChart(year: number) {
    this.service.getChart(year).subscribe((data: dataType) => {
      this.chartData = this.months.map((e, index) => {
        const indexOfMonth = data.xAxis.indexOf(index + 1);
        return {
          name: e,
          value: indexOfMonth !== -1 ? data.yAxis[indexOfMonth] : 0,
        };
      });
    });
  }

  search() {
    this.getChart(this.year);
  }

  checkQuantity() {
    this.productService.checkQuantity().subscribe((data: Product[]) => {
      this.productsRepo = data;
    });
  }
}
