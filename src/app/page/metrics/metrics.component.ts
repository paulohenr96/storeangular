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

  constructor(private service: UsersService) {
    this.getMetrics();
  }

  save() {
    this.service.editMetrics(this.metrics).subscribe((data: any) => {});
  }

  getMetrics() {
    this.service.getMetrics().subscribe((data: any) => {
      this.metrics = data;
    });
  }
}
