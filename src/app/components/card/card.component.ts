import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input()
  value: String = '';
  @Input()
  cor: String = '';
  @Input()
  title: String = '';

  @Input()
  icon: String = '';
}
