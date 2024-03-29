import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  erros: string[] = [];

  constructor(private router: Router, private service: LoginService) {}
  ngOnInit(): void {
    var token = sessionStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }
  user: Login = new Login();
  login() {
    this.erros = [];
    if (!this.checkFields()) return;
    this.service.login(this.user).subscribe(
      (data: any) => {
        console.log(data.fullToken);
        sessionStorage.setItem('goal', data.goal);
        sessionStorage.setItem('token', data.fullToken);
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem(
          'admin',
          data.roles[0] === 'admin' ? 'true' : 'false'
        );
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
        if (error.status === 401) {
          this.erros.push('Invalid Login');
          return;
        }
        this.erros.push('Internal Error : ' + error.status);
      }
    );
  }

  checkFields() {
    if (!this.user.password) this.erros.push('Insert a password...');
    if (!this.user.username) this.erros.push('Insert a username');

    return this.erros.length === 0;
  }
}
