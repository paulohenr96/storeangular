import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-danger',
  templateUrl: './card-danger.component.html',
  styleUrls: ['./card-danger.component.css'],
})
export class CardDangerComponent {
  @Input()
  arr: string[] = [];
}
