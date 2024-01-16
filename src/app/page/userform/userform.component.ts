import {
  FormStyle,
  TranslationWidth,
  getLocaleMonthNames,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesChart } from 'src/app/model/saleschart';
import { User } from 'src/app/model/user';
import { SalesService } from 'src/app/service/sales.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  passwordConfirm: string = '';
  msgSucesso: string = '';
  newPassword: string = '';
  checkPassword() {
    this.erros = [];
    this.service.confirmPassword(this.passwordConfirm).subscribe((s) => {
      console.log(s);
      if (s.response === 'true') {
        this.passwordConfirm = '';
        this.edit();
        return;
      }
      this.erros.push('Wrong password !!');
    });
  }
  erros: string[] = [];
  percentual: number = 0;
  search() {
    this.getChart();
  }
  role: string = '';
  chartData: any[] = [];
  year: number = 2024;

  edit() {
    this.service.edit(this.user).subscribe((s) => {
      console.log(s);
      if (!s) {
        this.msgSucesso = 'User edited.';
        return;
      }
      this.erros.push(s.response);

      this.getMonthlyIncome();
    });
  }
  reset() {
    this.user = new User();
  }
  validate(): Boolean {
    this.erros = [];
    if (!this.user.name) this.erros.push('Insert a name');
    if (!this.user.userName) this.erros.push('Insert a username');

    if (this.user.id === 0) {
      if (!this.user.password) this.erros.push('Insert a password');
    }

    if (this.user.rolesName.length === 0) this.erros.push('Choose a role');
    return this.erros.length === 0;
  }
  submit() {
    if (!this.validate()) return;
    this.service.save(this.user).subscribe((s: any) => {
      console.log(s);
      if (!s) {
        this.msgSucesso = 'User saved.';
        this.user = new User();
        return;
      }

      this.erros.push(s.response);
    });
  }
  user: User = new User();
  constructor(
    private router: ActivatedRoute,
    private service: UsersService,
    private saleService: SalesService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      if (res['id']) {
        console.log(res['id']);
        this.service.getById(res['id']).subscribe((u) => {
          this.user = u;
          this.getChart();
          this.getMonthlyIncome();
        });
      }
    });
  }

  getChart() {
    this.saleService
      .getChartByUsername(this.year, this.user.userName)
      .subscribe((data: SalesChart) => {
        this.chartData = getLocaleMonthNames(
          'en-us',
          FormStyle.Standalone,
          TranslationWidth.Wide
        )
          .map((e) => e)
          .map((e, index) => {
            const indexOfMonth = data.xAxis.indexOf(index + 1);

            return {
              name: e,
              value: indexOfMonth !== -1 ? data.yAxis[indexOfMonth] : 0,
            };
          });
      });
  }
  getMonthlyIncome() {
    this.saleService
      .getMonthlyTotal(this.user.userName, new Date().getMonth() + 1)
      .subscribe((data: any) => {
        if (data) this.setPercentual(data);
      });
  }
  setPercentual(value: any) {
    if (!this.user) {
      return;
    }
    this.percentual = (100 * value.valueOf()) / this.user.monthlyGoal.valueOf();
  }

  select($event: any) {
    this.setPercentual($event.value);
  }

  changePassword() {
    this.service.confirmPassword(this.passwordConfirm).subscribe((s) => {
      if (s) {
        const u: User = {
          id: this.user.id,
          name: '',
          rolesName: [],
          userName: '',
          password: this.newPassword,
          monthlyGoal: 0,
        };

        this.service
          .newPassword(u)
          .subscribe((data) => (this.msgSucesso = 'Password changed.'));
      }
    });
  }
}
