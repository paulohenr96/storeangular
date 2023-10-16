import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/model/sale';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { SalesService } from 'src/app/service/sales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  total: number = 0;
  count: Number = 0;
  totalQuantity: Number = 0;
  percentual: number = 50;
  goalIncome: number = 0;
  chartData: any[] = [];
  month: string = '';
  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  constructor(
    private service: SalesService,
    private productService: ProductServiceService
  ) {}
  ngOnInit(): void {
    this.findMonth();
    this.getInfo();
    this.getChart();
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

        this.calculatePercentual();
      }
    });
  }

  calculatePercentual() {
    this.goalIncome = 950;

    this.percentual = (100 * this.total) / this.goalIncome;
    if (this.percentual > 100) {
      this.percentual = 100;
    }
  }

  getChart() {
    this.service.getChart().subscribe((data: any) => {
      console.log(data);
      var array = [
        {
          name: 'Janeiro',
          value: 0, // Valor no eixo Y
        },
        {
          name: 'Fevereiro',
          value: 0,
        },
        {
          name: 'Março',
          value: 0,
        },
        {
          name: 'Abril',
          value: 0,
        },
        {
          name: 'Maio',
          value: 0,
        },
        {
          name: 'Junho',
          value: 0,
        },
        {
          name: 'Julho',
          value: 0,
        },
        {
          name: 'Agosto',
          value: 0,
        },
        {
          name: 'Setembro',
          value: 0,
        },
        {
          name: 'Outubro',
          value: 0,
        },
        {
          name: 'Novembro',
          value: 0,
        },
        {
          name: 'Dezembro',
          value: 0,
        },
        // Adicione mais dados conforme necessário
      ];
      const vetorZeros = [...Array(12)].map(() => 0);

      for (let i = 0; i < data.xAxis.length; i++) {
        array[data.xAxis[i] - 1].value = data.yAxis[i];
      }
      this.chartData = array;
    });
  }
}
