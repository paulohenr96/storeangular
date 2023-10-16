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
  ngOnInit(): void {
    console.log('NGONINIT !!!');
    this.username = sessionStorage.getItem('username')!;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
