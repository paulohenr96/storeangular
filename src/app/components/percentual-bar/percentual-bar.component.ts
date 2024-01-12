import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentual-bar',
  templateUrl: './percentual-bar.component.html',
  styleUrls: [],
})
export class PercentualBarComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {}
  ngOnInit(): void {}
  @Input()
  get percentual(): string {
    return this.textPercentual;
  }
  set percentual(value: number) {
    this.textPercentual = value.toFixed(2);
  }
  textPercentual: string = '';
}
