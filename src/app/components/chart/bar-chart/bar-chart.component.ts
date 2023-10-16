import { Component, Input, OnInit } from '@angular/core';
import { SalesService } from 'src/app/service/sales.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() xAxisLabel: string = 'Month';
  @Input() yAxisLabel: string = 'Sales';
  @Input() data: any[] = [];
  single = [
    {
      name: 'Janeiro',
      value: this.data[0], // Valor no eixo Y
    },
    {
      name: 'Fevereiro',
      value: this.data[1],
    },
    {
      name: 'Março',
      value: this.data[2],
    },
    {
      name: 'Abril',
      value: this.data[3],
    },
    {
      name: 'Maio',
      value: this.data[4],
    },
    {
      name: 'Junho',
      value: this.data[5],
    },
    {
      name: 'Julho',
      value: this.data[6],
    },
    {
      name: 'Agosto',
      value: this.data[7],
    },
    {
      name: 'Setembro',
      value: this.data[8],
    },
    {
      name: 'Outubro',
      value: this.data[9],
    },
    {
      name: 'Novembro',
      value: this.data[10],
    },
    {
      name: 'Dezembro',
      value: this.data[11],
    },
    // Adicione mais dados conforme necessário
  ];

  constructor(private service: SalesService) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
