import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percentual-bar',
  templateUrl: './percentual-bar.component.html',
  styleUrls: [],
})
export class PercentualBarComponent {
  @Input()
  percentual: number = 0;
}
