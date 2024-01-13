import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-success',
  templateUrl: './card-success.component.html',
  styleUrls: ['./card-success.component.css'],
})
export class CardSuccessComponent {
  @Input()
  msg: string = '';

  constructor() {
    setInterval(() => {
      this.msg = '';
    }, 5000);
  }
}
