import { Component } from '@angular/core';
import { Metrics } from 'src/app/model/metrics';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent {
  metrics: Metrics = new Metrics();
  erros: string[] = [];
  msgSucesso: string = '';

  constructor(private service: UsersService) {
    this.getMetrics();
  }

  save() {
    this.msgSucesso = '';

    if (isNaN(this.metrics.monthlyGoal)) {
      this.erros.push('Invalid value');
      return;
    }
    this.service.editMetrics(this.metrics).subscribe((data: any) => {
      this.msgSucesso = 'Done.';
      console.log(this.msgSucesso);
    });
  }

  getMetrics() {
    this.service.getMetrics().subscribe((data: any) => {
      this.metrics = data;
    });
  }
}
