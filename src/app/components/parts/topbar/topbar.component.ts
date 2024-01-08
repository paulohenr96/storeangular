import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  constructor(private router: Router) {}
  username: string = 'asdasdas';
  roles: string[] = [];
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')!;
    this.roles = sessionStorage.getItem('roles')?.split(',')!;
    console.log(this.roles);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
