import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private service: LoginService) {}
  ngOnInit(): void {
    var token = sessionStorage.getItem('token');
    if (!(token == '' || token == undefined)) {
      this.router.navigate(['/home']);
    }
  }
  user: User = new User();
  login() {
    this.service.login(this.user).subscribe(
      (data: any) => {
        console.log(data);

        sessionStorage.setItem('token', data.fullToken);
        sessionStorage.setItem('username', this.user.username);

        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
        alert('Error');
      }
    );
  }
}
