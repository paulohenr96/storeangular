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
  @Input()
  width: number = 1000;
  @Input()
  height: number = 400;

  @Input()
  functionParam: (($event: any) => void) | undefined;
  onSelect($event: any) {
    if (this.functionParam) this.functionParam($event);
  }
  constructor(private service: SalesService) {}

  ngOnInit(): void {
    // this.single = getLocaleMonthNames(
    //   'en-us',
    //   FormStyle.Standalone,
    //   TranslationWidth.Wide
    // ).map((e, i) => {
    //   return {
    //     name: e,
    //     value: this.data[i],
    //   };
    // });

    console.log(this.data);
  }
}
