import {
  FormStyle,
  TranslationWidth,
  getLocaleMonthNames,
} from '@angular/common';
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
  single: any[] = [];

  constructor(private service: SalesService) {}

  ngOnInit(): void {
    this.single = getLocaleMonthNames(
      'en-us',
      FormStyle.Standalone,
      TranslationWidth.Wide
    ).map((e, i) => {
      return {
        name: e,
        value: this.data[i],
      };
    });

    console.log(this.data);
  }
}
