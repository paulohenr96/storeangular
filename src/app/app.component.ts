import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
  title = 'store';
  constructor(private router: Router) {}
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  isConnected(): Boolean {
    return sessionStorage.getItem('token') != undefined;
  }
  isAdmin(): Boolean {
    return sessionStorage.getItem('roles')?.includes('admin') ? true : false;
  }
}
